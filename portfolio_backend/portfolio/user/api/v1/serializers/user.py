from django.contrib.auth.models import User
from rest_framework import serializers

from portfolio.commons.api.v1.serializers.file_upload import FileUploadSerializer
from portfolio.commons.serializers import DynamicFieldsModelSerializer
from portfolio.resume.api.v1.serializers.resume import EducationSerializer, ExperienceSerializer, SkillSerializer, \
    CertificateSerializer
from portfolio.resume.models import Education, Experience, Skill, Certificate
from portfolio.testimonial.api.v1.serializers.testimonial import TestimonialSerializer
from portfolio.testimonial.models import Testimonial
from portfolio.user.models import UserInfo, SocialMedia, WhatIDoItem


class UserInfoSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['name', 'description', 'experience', 'project_completed', 'happy_client', 'main_image', 'address',
                  'email', 'phone', 'user_about_title', 'user_about_desc', 'user_about_image', 'what_i_do_desc']

    def get_fields(self):
        fields = super(UserInfoSerializer, self).get_fields()
        request = self.context.get('request')
        if request and request.method.lower() in ['get']:
            fields['main_image'] = FileUploadSerializer()
            fields['user_about_image'] = FileUploadSerializer()
            fields["social_links"] = serializers.SerializerMethodField()
            fields["what_i_do_items"] = serializers.SerializerMethodField()
            fields["educations"] = serializers.SerializerMethodField()
            fields["experiences"] = serializers.SerializerMethodField()
            fields["skills"] = serializers.SerializerMethodField()
            fields["certificates"] = serializers.SerializerMethodField()
            fields["testimonials"] = serializers.SerializerMethodField()
        return fields

    def get_social_links(self, obj):
        social_medias = SocialMediaSerializer(SocialMedia.objects.filter(user=obj.user), many=True,
                                              context=self.context).data
        return {sm['name']: sm['link'] for sm in social_medias}

    def get_what_i_do_items(self, obj):
        return WhatIDoItemSerializer(WhatIDoItem.objects.filter(user=obj.user), many=True, context=self.context).data

    def get_educations(self, obj):
        return EducationSerializer(Education.objects.filter(user=obj.user), many=True, context=self.context).data

    def get_experiences(self, obj):
        return ExperienceSerializer(Experience.objects.filter(user=obj.user), many=True, context=self.context).data

    def get_skills(self, obj):
        return SkillSerializer(Skill.objects.filter(user=obj.user), many=True, context=self.context).data

    def get_certificates(self, obj):
        return CertificateSerializer(Certificate.objects.filter(user=obj.user), many=True, context=self.context).data

    def get_testimonials(self, obj):
        return TestimonialSerializer(Testimonial.objects.filter(user=obj.user), many=True, context=self.context).data


class SocialMediaSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['name', 'link']


class WhatIDoItemSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = WhatIDoItem
        fields = ['title', 'desc']


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'is_active', 'groups')
