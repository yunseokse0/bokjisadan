This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### GitHub 연동 (권장)

1. [Vercel](https://vercel.com) 로그인 후 **Add New** → **Project**
2. **Import Git Repository**에서 `yunseokse0/bokjisadan` 선택
3. **Deploy** (기본 설정으로 배포)
4. **Settings** → **Environment Variables**에서 필요 시 추가:
   - `YOUTUBE_API_KEY` — YouTube Data API v3 키 (실시간 시청자 수)
   - `TELEGRAM_BOT_TOKEN` — 게스트 예약 알림용 봇 토큰
   - `TELEGRAM_CHAT_ID` — 알림 받을 채팅 ID

배포 후 푸시할 때마다 자동으로 재배포됩니다.

### CLI 배포

```bash
npm i -g vercel   # 최초 1회
vercel            # 로그인 후 프로젝트 연결
npm run deploy    # 프로덕션 배포
```
