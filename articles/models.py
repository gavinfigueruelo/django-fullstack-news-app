from django.db import models
from django.conf import settings
# Create your models here.
class Article(models.Model):

    DRAFT = 'DRF'
    SUBMITTED = 'SUB'
    PUBLISHED = 'PUB'
    ARCHIVED = 'ARC'

    PHASE_CHOICES = [
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (PUBLISHED, 'Published'),
        (ARCHIVED, 'Archived'),
    ]

    COM = 'Community'
    ISP = 'Inspiring'
    SPT = 'Sports'
    LOC = 'Local'
    INT = 'International'
    UD = 'Undecided'

    TYPES = [
        (COM, 'Community'),
        (ISP, 'Inspiring'),
        (SPT, 'Sports'),
        (LOC, 'Local'),
        (INT, 'International'),
        (UD, 'Undecided'),
    ]

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True)
    body = models.TextField(null=True)
    published = models.BooleanField(default=False)
    phasechoices = models.CharField(
        max_length=9,
        choices=PHASE_CHOICES,
        default=DRAFT,
        null=True
    )

    types = models.CharField(
        max_length=13,
        choices=TYPES,
        default= UD,
    )



    def __str__(self):
        return self.title[:13]
