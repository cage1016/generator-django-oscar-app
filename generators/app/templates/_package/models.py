<% if (isPaymentPackage) { %>
from django.db import models
from django.utils.encoding import python_2_unicode_compatible

from <%= packagename %> import base

@python_2_unicode_compatible
class OrderTransaction(base.ResponseModel):

    # implement property you want

    def __str__(self):
        return '' # implement you want
<%}else{%>
from django.db import models

# Create your models here.
<%}%>
