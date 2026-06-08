# design-saas.md

> Aurora Studio 같은 **시각적 톤이 강한 다크 SaaS UI**를 만들 때 Claude Code가 따라야 할 디자인 기준.
> 디자이너의 판단을 Claude Code가 재사용할 수 있도록 토큰·규칙으로 정리한 문서.

---

## 1. 컬러 시스템 (Dark Mode 전용)

| Token | Value | 용도 |
| --- | --- | --- |
| `ink` | `#07070c` | 페이지 배경 (Tailwind `bg-ink`) |
| `surface` | `rgba(255,255,255,0.04)` | 카드 / 컨트롤 표면 (`.glass`) |
| `surface-hover` | `rgba(255,255,255,0.08)` | hover 상태 (`.glass-hover`) |
| `border` | `rgba(255,255,255,0.08)` | 기본 테두리 (Tailwind `border-DEFAULT`) |
| `border-strong` | `rgba(255,255,255,0.16)` | 강조 테두리 (`border-strong`) |
| `text` | `#ffffff` | 본문 |
| `muted` | `#8b8b9a` | 보조 텍스트 |
| `muted-strong` | `#c9c9d4` | 강조 보조 텍스트 |
| `success` | `#4ade80` | live indicator / toast 체크 |

**원칙**

- 페이지 배경에는 항상 한두 개의 subtle radial-gradient overlay를 깔아 깊이를 만든다.
- 강조 컬러는 인스턴스별로 자유롭게 줄 수 있지만, surface·border·text는 위 토큰을 고정으로 사용한다.

---

## 2. Typography

| Role | Font | Weight | Size | Tracking |
| --- | --- | --- | --- | --- |
| Display H1 | Inter | 800 | `clamp(38px, 6vw, 68px)` | `-0.04em` |
| Section title | Inter | 700 | 18–26px | `-0.01em` |
| Body | Inter | 500 | 14–16px | 0 |
| Caption / label | Inter | 600 | 11–12px **UPPERCASE** | `0.08em` |
| Logo / wordmark | Space Grotesk | 700 | 17px | `-0.01em` |

- 본문 `line-height: 1.6`
- Display 텍스트에는 `white → muted` gradient text 사용 가능 (`.text-gradient`)

---

## 3. Spacing — 8px grid

- 컴포넌트 내부 padding: **14, 16, 22, 28, 34**
- 섹션 간격: **24, 32, 48, 56, 64**
- 카드 사이 gap: **12, 16, 24**
- 인라인 gap: **6, 8, 10, 12**

8의 배수에서 크게 벗어나지 않는다. 4의 배수(14 등)는 허용.

---

## 4. Border-radius

- pill: `9999px`
- 컨트롤 / 카드 small: `10–12px`
- 카드 medium: `14–16px`
- hero / large surface: `20–22px`

---

## 5. Surface 효과

- 모든 floating control은 **glassmorphism**:
  `background: surface; backdrop-filter: blur(12–16px); border: 1px solid border;`
- 그림자는 두 종류만:
  - `shadow-lg` → 큰 표면용
  - `shadow-glow` → 시각적 강조 (그라디언트 캔버스 같은 hero element)
- hover 시 `translateY(-1px ~ -4px)` + border-strong.

---

## 6. 버튼 계층

| Level | 스타일 | 용도 |
| --- | --- | --- |
| Primary | white bg, dark text, weight 600 | 화면당 1개 핵심 CTA |
| Secondary | surface + border, white text | 보조 액션 |
| Ghost | transparent + muted text → white on hover | inline 액션 |
| Icon | 32–34px square, surface-hover | 라이브러리 / inline 컨트롤 |
| Danger | hover에서만 red 표시 | 삭제 등 |

위험한 액션은 평소엔 중립이고 **hover에서만 색상으로 의도를 드러낸다**.

---

## 7. State 가이드

- 모든 list / grid에는 **Empty State** 필수: 텍스트 + 다음 행동 안내.
- 비동기 작업 결과는 **Toast** 단일 인스턴스로 즉시 피드백 (2.4s 자동 닫힘).
- 모든 input은 `:focus-visible` outline을 잃지 않는다.
- 무거운 비동기 작업이 생기면 **Loading State** 정의 후 추가.

---

## 8. 반응형 기준

| Breakpoint | 변경 |
| --- | --- |
| `≤ 880px` | controls 1열, action group `grid-cols-3` |
| `≤ 560px` | header secondary CTA 숨김, hint 텍스트 축소, preset 줄바꿈 |

---

## 9. 모션

- 기본 transition: `0.18s ease`
- 시각 요소: `cubic-bezier(0.4, 0, 0.2, 1)`
- "항상 살아있는" 요소(로고, hero gradient)만 14–18s 루프 애니메이션 사용.
- 모션을 남발하지 않는다 — 한 화면에 동시 모션은 3개 이하.

---

## 10. 수정 금지 영역 (모든 PR 공통)

- API 호출 로직
- 인증 / 권한 로직
- 데이터 모델
- 라우팅 구조
- `package.json` / lock file
- `.env*` 관련 파일
- `src/lib/mesh.ts`의 함수 시그니처
- `src/lib/storage.ts`의 localStorage key (`aurora-library`)

이 영역은 `product-main-repo`의 책임이며, `product-uiux-repo`에서는 **절대 수정하지 않는다.**
