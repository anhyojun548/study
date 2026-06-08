# product-uiux-repo

> **Aurora Studio** — 디자이너 AI Workflow Guide 기준의 UI/UX 전용 repository.
> 실제 운영 코드(API, auth, infra, secret)는 포함하지 않습니다.

## 실행

```bash
npm install
npm run dev
```

→ http://localhost:3000

## 폴더 구조

```
product-uiux-repo/
├── src/
│   ├── app/                  # Next.js App Router 페이지
│   ├── components/
│   │   ├── aurora/           # Aurora Studio 화면 컴포넌트
│   │   └── ui/               # 재사용 UI primitive (Button, Badge, Toast)
│   └── lib/                  # 순수 로직 헬퍼 (mesh, storage, types)
├── design-skills/            # Claude Code에 전달할 디자인 기준 (★ design-saas.md)
├── design-specs/             # 화면별 명세 / Figma Frame 참조
├── mock-data/                # UI 작업용 mock 데이터 (실제 API 호출 없음)
└── public/                   # 정적 asset
```

## 브랜치 전략

| 브랜치 | 관리 주체 | 용도 |
| --- | --- | --- |
| `main` | 기획팀 / 개발팀 | 기준 브랜치 |
| `uiux/aurora-studio` | 개발팀 | 1차 프로토타입 push 브랜치 |
| `designer/aurora-studio-uiux` | 디자이너 | 실제 작업 브랜치 |

```bash
git checkout uiux/aurora-studio
git checkout -b designer/aurora-studio-uiux
# 작업 후
git push origin designer/aurora-studio-uiux
```

## 디자이너 작업 흐름

1. `designer/aurora-studio-uiux` 브랜치 생성 → `npm run dev`
2. Claude Code에 `design-skills/design-saas.md` 기준 1차 개선 요청 (수정 금지 영역 명시)
3. Figma에서 세부 보정 → Figma MCP로 코드 반영
4. 로컬 Preview에서 비교 검수
5. push 후 개발팀에 브랜치명·변경 요약·확인 요청사항 전달

## 수정 금지 영역 (모든 PR 공통)

- API 호출 / 인증·권한 / 데이터 모델 / 라우팅 구조
- `package.json`, lock file
- `.env*` 관련 파일
- `src/lib/mesh.ts`의 함수 시그니처, `storage.ts`의 localStorage key
  (저장된 사용자 데이터 호환성 보장)

자세한 디자인 기준은 [`design-skills/design-saas.md`](./design-skills/design-saas.md),
화면 명세는 [`design-specs/aurora-studio.md`](./design-specs/aurora-studio.md) 참고.
