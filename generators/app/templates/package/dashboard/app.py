from django.conf.urls import url

from oscar.core.application import Application
from oscar.core.loading import get_class


class <%= capitalizePackagename %>DashboardApplication(Application):
    name = None

    default_permissions = ['is_staff', ]
    permissions_map = {
        '<%= packagename %>-list': (['is_staff'], ['partner.dashboard_access']),
    }

    <%= packagename %>_list = get_class('<%= packagename %>.dashboard.views', '<%= capitalizePackagename %>ListView')

    def get_urls(self):
        urlpatterns = [
            url(r'^$', self.<%= packagename %>_list.as_view(), name='<%= packagename %>-list'),
        ]
        return self.post_process_urls(urlpatterns)


application = <%= capitalizePackagename %>DashboardApplication()
