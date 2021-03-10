from django.test import SimpleTestCase

from django.urls import reverse, resolve
from .views import IndexView


class HomepageTests(SimpleTestCase):
    '''unit tests are run from top to bottom'''

    def setUp(self):
        url = reverse('frontend:home')
        self.response = self.client.get(url)

    def test_homepage_status_code(self):
        self.assertEqual(self.response.status_code, 200)

    def test_homepage_url_name(self):
        # response = self.cliemt.get(reversed('frontend:home'))
        self.assertEqual(self.response.status_code, 200)

    def test_homepage_url_resolves_homepageview(self):
        view = resolve('/')
        self.assertEqual(
            view.func.__name__,
            IndexView.as_view().__name__
        )
