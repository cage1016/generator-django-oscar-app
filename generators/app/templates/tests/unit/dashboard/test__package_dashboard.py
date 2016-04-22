from django.core.urlresolvers import reverse
from django.core.urlresolvers import resolve

from oscar.test.testcases import WebTestCase

from <%= packagename %>.dashboard.views import <%= capitalizePackagename %>ListView


class Test<%= capitalizePackagename %>DashboardIndexForStaffUser(WebTestCase):
    is_staff = True

    def test_<%= packagename %>_dashboard_url_resolve(self):
        found = resolve(reverse('<%= packagename %>-list'))
        self.assertTrue(found.func.func_name, <%= capitalizePackagename %>ListView.__name__)

    def test_<%= packagename %>_dashboard_view_load(self):
        response = self.get(reverse('<%= packagename %>-list'))
        self.assertTemplateUsed(response, '<%= packagename %>/dashboard/<%= packagename %>_list.html')
