import random

from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from <%= packagename %> import gateway
from <%= packagename %>.models import OrderTransaction


class Facade(object):
    """
    A bridge between oscar's objects and the core gateway object
    """

    def __init__(self):
        # implement gateway
        self.gateway = gateway.Gateway()
