from django.db import models

class CompanyInfo(models.Model):
    # 会社概要を定義する例
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    founded = models.DateField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
