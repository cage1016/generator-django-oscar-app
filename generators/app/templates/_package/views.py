<% if (isPaymentPackage) { %>from django.views.generic import RedirectView, View

import oscar
from oscar.core.loading import get_class, get_model

# Load views dynamically
PaymentDetailsView = get_class('checkout.views', 'PaymentDetailsView')
CheckoutSessionMixin = get_class('checkout.session', 'CheckoutSessionMixin')


class RedirectView(CheckoutSessionMixin, RedirectView):
    """
    Initiate the transaction with <%= packagename %> and redirect the user
    to <%= packagename %>'s Checkout to perform the transaction.
    """
    permanent = False

    # Setting to distinguish if the site has already collected a shipping
    # address.  This is False when redirecting to PayPal straight from the
    # basket page but True when redirecting from checkout.
    as_payment_method = False

    def get_redirect_url(self, **kwargs):
        raise NotImplementedError("implement redirect url!")


class CancelResponseView(RedirectView):
    permanent = False

    # implement here


class SuccessResponseView(PaymentDetailsView):
    template_name_preview = '<%= packagename %>/preview.html'
    preview = True

    # implement here

class ShippingOptionsView(View):
    pass
<%}else{%># Create your views here.
<%}%>
