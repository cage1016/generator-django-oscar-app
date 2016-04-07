from oscar.app import Shop

<% if (isPaymentPackage) { %>
from apps.checkout.app import application as checkout_app


class <%= capitalizePackagename %>Shop(Shop):
    checkout_app = checkout_app
<%}else{%>
class <%= capitalizePackagename %>Shop(Shop):
    pass

<%}%>

application = <%= capitalizePackagename %>Shop()
