"""CMS content endpoint tests + regression checks for /api/contact list and POST /api/contact."""
import os
import uuid

import pytest

ADMIN_KEY = "ba-admin-3f9a7c2e8d14b650"


# -- CMS content endpoints --
class TestContentEndpoints:
    def test_get_content_public(self, client):
        r = client.get("/content")
        assert r.status_code == 200
        assert isinstance(r.json(), dict)

    def test_put_content_requires_admin(self, client):
        r = client.put("/content/home", json={"data": {"hero_line1": "x"}})
        assert r.status_code == 401

    def test_put_content_bad_key(self, client):
        r = client.put(
            "/content/home",
            json={"data": {"hero_line1": "x"}},
            headers={"X-Admin-Key": "wrong-key"},
        )
        assert r.status_code == 401

    def test_put_and_get_roundtrip(self, client):
        unique = f"TESTCMS-{uuid.uuid4().hex[:8]}"
        key = "TEST_cms_temp"
        try:
            r = client.put(
                f"/content/{key}",
                json={"data": {"hero_line1": unique, "hero_line2": "line-2"}},
                headers={"X-Admin-Key": ADMIN_KEY},
            )
            assert r.status_code == 200, r.text
            body = r.json()
            assert body["key"] == key
            assert body["data"]["hero_line1"] == unique

            r2 = client.get("/content")
            assert r2.status_code == 200
            got = r2.json()
            assert key in got
            assert got[key]["hero_line1"] == unique
            assert got[key]["hero_line2"] == "line-2"
        finally:
            # cleanup - overwrite with empty data so it won't appear as override
            client.put(
                f"/content/{key}",
                json={"data": {}},
                headers={"X-Admin-Key": ADMIN_KEY},
            )

    def test_put_service_page_slash_key(self, client):
        """BUG1 fix: page_key with slash (services/ai-seo) must save (was 404)."""
        key = "services/ai-seo"
        unique = f"TEST-svc-{uuid.uuid4().hex[:6]}"
        try:
            r = client.put(
                f"/content/{key}",
                json={"data": {"intro": unique, "faq1_q": "Q1?", "faq1_a": "A1."}},
                headers={"X-Admin-Key": ADMIN_KEY},
            )
            assert r.status_code == 200, r.text
            assert r.json()["data"]["intro"] == unique
            g = client.get("/content")
            assert g.status_code == 200
            assert g.json().get(key, {}).get("intro") == unique
        finally:
            client.delete(f"/content/{key}", headers={"X-Admin-Key": ADMIN_KEY})

    def test_put_empty_values_strip_and_delete(self, client):
        """BUG2/4 fix: empty-string values are stripped; all-empty payload deletes doc."""
        key = f"TEST_empty_{uuid.uuid4().hex[:6]}"
        # First save a real value
        r = client.put(
            f"/content/{key}",
            json={"data": {"hero_line1": "seed"}},
            headers={"X-Admin-Key": ADMIN_KEY},
        )
        assert r.status_code == 200
        # Now clear
        r2 = client.put(
            f"/content/{key}",
            json={"data": {"hero_line1": ""}},
            headers={"X-Admin-Key": ADMIN_KEY},
        )
        assert r2.status_code == 200
        assert r2.json()["data"] == {}
        # Verify key removed from GET
        g = client.get("/content")
        assert key not in g.json()

    def test_delete_content_requires_admin(self, client):
        """DELETE endpoint auth."""
        r = client.delete("/content/home")
        assert r.status_code == 401

    def test_delete_content_ok(self, client):
        key = f"TEST_del_{uuid.uuid4().hex[:6]}"
        client.put(
            f"/content/{key}",
            json={"data": {"x": "y"}},
            headers={"X-Admin-Key": ADMIN_KEY},
        )
        r = client.delete(f"/content/{key}", headers={"X-Admin-Key": ADMIN_KEY})
        assert r.status_code == 200
        g = client.get("/content")
        assert key not in g.json()

    def test_put_content_size_limit(self, client):
        big = "x" * 40000
        r = client.put(
            "/content/TEST_toobig",
            json={"data": {"k": big}},
            headers={"X-Admin-Key": ADMIN_KEY},
        )
        assert r.status_code == 400


# -- Regression: enquiries admin list (pydantic phone=None fix) --
class TestContactAdminRegression:
    def test_list_inquiries_requires_admin(self, client):
        r = client.get("/contact")
        assert r.status_code == 401

    def test_list_inquiries_ok(self, client):
        r = client.get("/contact", headers={"X-Admin-Key": ADMIN_KEY})
        assert r.status_code == 200, r.text
        assert isinstance(r.json(), list)


# -- Regression: contact form POST works --
class TestContactSubmit:
    def test_post_contact_success(self, client):
        payload = {
            "name": "TEST User CMS Regression",
            "business": "TEST Co",
            "email": f"test-{uuid.uuid4().hex[:6]}@example.com",
            "phone": "+91 9999999999",
            "website": "https://example.com",
            "services": ["SEO"],
            "goals": "This is a test enquiry submission for CMS regression testing.",
        }
        r = client.post("/contact", json=payload)
        assert r.status_code == 201, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert body["email"] == payload["email"]
        assert body["status"] == "new"
        assert "id" in body

    def test_post_contact_validation(self, client):
        r = client.post("/contact", json={"name": "x", "email": "bad", "phone": "1", "goals": "short"})
        assert r.status_code == 422
