<!doctype html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>پنل مدیریت</title>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .auth-container {
            background: #fff;
            padding: 32px;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
        }
        .auth-header {
            text-align: center;
            margin-bottom: 32px;
        }
        .auth-header h1 {
            margin: 0;
            color: #1f2937;
            font-size: 24px;
        }
        .form-group {
            margin-bottom: 16px;
        }
        label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            font-size: 14px;
            color: #374151;
        }
        input[type=email], input[type=password] {
            width: 100%;
            padding: 10px;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            font-family: inherit;
            font-size: 14px;
        }
        input[type=email]:focus, input[type=password]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .btn {
            display: block;
            width: 100%;
            padding: 10px;
            background: #667eea;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #5568d3;
        }
        .flash {
            padding: 12px;
            background: #fee2e2;
            border: 1px solid #fca5a5;
            border-radius: 4px;
            margin-bottom: 16px;
            color: #dc2626;
            font-size: 13px;
        }
        @media (max-width: 480px) {
            .auth-container {
                padding: 24px;
                border-radius: 0;
            }
            .auth-header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
<div class="auth-container">
    <div class="auth-header">
        <h1>پنل مدیریت کافه</h1>
    </div>
    @yield('content')
</div>
</body>
</html>
