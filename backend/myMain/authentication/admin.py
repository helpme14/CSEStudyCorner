
from django.contrib import admin
from authentication.models import User, Profile

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email','verified']
    list_editable = ['verified']

class ProfileAdmin(admin.ModelAdmin):
    
    list_display = ['user','full_name']

admin.site.register(User,UserAdmin)
admin.site.register(Profile,ProfileAdmin)
