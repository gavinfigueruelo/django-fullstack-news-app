from django.db import models
from django.conf import settings
# Create your models here.
class Article(models.Model):

    DRAFT = 'DRF'
    SUBMITTED = 'SUB'
    PUBLISHED = 'PUB'
    ARCHIVED = 'ARC'
    REJECTED = 'REJ'
    PHASE_CHOICES = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (PUBLISHED, 'Published'),
        (ARCHIVED, 'Archived'),
        (REJECTED, 'Rejected'),
    ]

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True)
    body = models.TextField(null=True)
    published = models.BooleanField(default=False)
    phasechoices = models.CharField(
        max_length=3,
        choices=PHASE_CHOICES,
        default=DRAFT, null=True)


    def __str__(self):
        return self.title
