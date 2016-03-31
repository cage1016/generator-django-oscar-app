from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class <%= capitalizePackagename %>Config(AppConfig):
    label = '<%= packagename %>'
    name = '<%= packagename %>'
    verbose_name = _('<%= capitalizePackagename %>')
