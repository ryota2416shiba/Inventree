# customauth/views.py

from django.shortcuts import render, redirect
from django.views import View
# from django.contrib.auth import login, authenticate, etc...
# 必要に応じてインポートを追加

class LoginView(View):
    def get(self, request):
        # ログイン画面を返す
        return render(request, 'customauth/login.html')

    def post(self, request):
        # ログイン処理
        # e.g. ユーザ認証 → 成功したら redirect、失敗したら再度テンプレートを返す 等
        return redirect('/')

class RegisterView(View):
    def get(self, request):
        # 新規登録フォームを返す
        return render(request, 'customauth/register.html')

    def post(self, request):
        # 新規登録処理
        # e.g. フォームの検証、ユーザ作成 等
        return redirect('/')
