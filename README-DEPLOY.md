# MAP컨설팅 배포 순서

## 현재 상태

- 사이트는 Next.js 프로젝트로 동작합니다.
- `npm run lint`, `npm run build` 기준으로 배포 가능한 상태입니다.
- GitHub 저장소: `honghyunwoo/mediasset`
- Vercel 프로젝트: `mediasset`
- 공개 도메인: `https://mediasset.kr`
- 문의 운영은 `이메일 수신 중심`으로 정리되어 있습니다.

## 권장 배포 방식

- 1차 공개: `GitHub + Vercel + mediasset.kr`
- 문의 운영: `운영 메일 + Resend`

## 순서

### 1. 로컬 수정 확인

- `npm run lint`
- `npm run build`

### 2. GitHub 반영

- 변경 사항 commit
- `main` 브랜치 push

### 3. Vercel 배포

- Vercel이 GitHub 커밋을 자동 배포
- production 배포 상태 확인

### 4. 도메인 연결

- `mediasset.kr`, `www.mediasset.kr`가 Vercel을 가리키는지 확인
- HTTPS 접속 확인

### 5. 문의 메일 연결

- 필요한 것:
  - Resend API Key
  - 발신 주소
  - 수신 주소 `mediasset1@gmail.com`

### 6. 최종 운영 점검

- 체크 항목:
  - 외부 네트워크에서 사이트 접속
  - 문의 접수
  - 메일 알림
  - 모바일 확인

## 내가 바로 할 수 있는 것

- `home` 폴더를 독립 Git 저장소로 정리
- GitHub push
- Vercel 배포 점검
- DNS 상태 확인

## 사용자가 직접 해야 하는 것

- Resend 계정 및 도메인 인증
- 발신 메일 주소 준비
