from django.views import generic


from oscar.core.loading import get_classes, get_model

class <%= capitalizePackagename %>ListView(generic.TemplateView):
    """
      Dashboard view of the <%= packagename %> list.
      Supports the permission-based dashboard.
    """

    template_name = '<%= packagename %>/dashboard/<%= packagename %>_list.html'

    def get_context_data(self, **kwargs):
        ctx = super(<%= capitalizePackagename %>ListView, self).get_context_data(**kwargs)
        return ctx
