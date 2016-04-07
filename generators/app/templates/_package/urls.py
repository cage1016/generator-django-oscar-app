<% if (isPaymentPackage) { %>
from django.conf.urls import *
from django.views.decorators.csrf import csrf_exempt

from <%= packagename %> import views


urlpatterns = patterns('',
    # Views for normal flow that starts on the basket page
    url(r'^redirect/', views.RedirectView.as_view(), name='<%= packagename %>-redirect'),
    url(r'^preview/(?P<basket_id>\d+)/$', views.SuccessResponseView.as_view(preview=True),
        name='<%= packagename %>-success-response'),
    url(r'^cancel/(?P<basket_id>\d+)/$', views.CancelResponseView.as_view(),
        name='<%= packagename %>-cancel-response'),
    url(r'^place-order/(?P<basket_id>\d+)/$', views.SuccessResponseView.as_view(),
        name='<%= packagename %>-place-order'),
    # Callback for getting shipping options for a specific basket
    url(r'^shipping-options/(?P<basket_id>\d+)/', csrf_exempt(views.ShippingOptionsView.as_view()),
        name='<%= packagename %>-shipping-options'),
    # View for using <%= packagename %> as a payment method
    url(r'^payment/', views.RedirectView.as_view(as_payment_method=True),
        name='<%= packagename %>-direct-payment'),
)
<%}else{%>
from <%= packagename %> import views

# create your urls here.
<%}%>
