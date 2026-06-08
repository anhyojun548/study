# Aurora Studio — UI/UX Spec

> 메쉬 그라디언트를 생성·저장·내보내는 단일 페이지 SaaS의 디자인 명세.
> 시각적 참고용 원본 정적 프로토타입: [`./aurora-prototype.html`](./aurora-prototype.html)
> (현재 Next.js 구현이 이 프로토타입을 1:1로 옮긴 것. 디자인 보정 시 픽셀 단위 비교에 사용)

---

## 화면 목적

디자이너 / 개발자가 **1분 안에** 마음에 드는 메쉬 그라디언트를 만들어 CSS 또는 PNG로 가져갈 수 있게 한다.

---

## 화면 구성 (Desktop)

| # | Section | 핵심 요소 |
| --- | --- | --- |
| 1 | **Header** | 로고(AURORA + 회전 conic 마크), Pro 배지, Sign in / Upgrade |
| 2 | **Hero** | live user count eyebrow, gradient-text H1, 보조 설명 |
| 3 | **Canvas** | 16:9 메쉬 그라디언트 미리보기. 클릭/Space로 새 생성. 좌상단 단축키 힌트. |
| 4 | **Controls** | Style preset (6개), Layers 슬라이더, Save / Copy CSS / Download PNG |
| 5 | **Library** | localStorage 기반 저장 그리드. hover 시 적용/다운로드/삭제. |
| 6 | **Footer** | Docs / Changelog / Pricing / Twitter (placeholder) |

---

## Figma Frame 참조

> Figma MCP로 작업할 때는 아래 Frame 이름을 정확히 사용한다.

| Section | Frame name |
| --- | --- |
| Header | `Aurora / Desktop / Header` |
| Hero | `Aurora / Desktop / Hero` |
| Canvas | `Aurora / Desktop / Canvas` |
| Controls | `Aurora / Desktop / Controls` |
| Library card | `Aurora / Components / Library Item` |
| Toast | `Aurora / Components / Toast` |
| Mobile root | `Aurora / Mobile / Root` |

---

## 인터랙션

- **Canvas 클릭** 또는 **Space** → 새 그라디언트
- **Style** 변경 → 즉시 새 그라디언트
- **Layers** 슬라이더 → drag 중에는 숫자만 갱신, `change`(mouseup/touchend) 시 새 그라디언트
- **Save** → localStorage push, 라이브러리 갱신, toast
- **Copy CSS** → clipboard에 `background-color` + `background-image: radial-gradient(...)` 복사
- **Download PNG** → 1920×1080 offscreen canvas에 다시 그려 PNG 다운로드
- **Library hover** → 액션 오버레이 (적용 / PNG / 삭제)

---

## State 정의

- **Library Empty State**: "아직 저장된 그라디언트가 없어요. 마음에 드는 걸 만들면 **Save** 버튼으로 저장하세요."
- **Toast**: 단일 인스턴스, 하단 중앙, 2.4s 자동 닫힘.
- **Loading**: 현재 모든 액션이 즉시 완료되므로 별도 로딩 없음. 무거운 작업 추가 시 별도 정의.

---

## 데이터 계약 (수정 금지)

```ts
type GradientPoint = { x: number; y: number; r: number; color: string };
type Mesh = { id?: number; base: string; gradients: GradientPoint[]; preset: string };
```

- `src/lib/mesh.ts`의 `generateMesh / meshToBackgroundImage / meshToCSS / exportMeshToPNG` 시그니처
- `src/lib/storage.ts`의 localStorage key `"aurora-library"`
- preset 키: `aurora` / `sunset` / `ocean` / `cyberpunk` / `pastel` / `forest`

위 시그니처가 바뀌면 저장된 사용자 데이터가 깨지거나 컴포넌트 props가 호환 안 됨.

---

## 반응형

| Breakpoint | 변경사항 |
| --- | --- |
| `≤ 880px` | controls 1열, action group `grid-cols-3` |
| `≤ 560px` | header `Sign in` 숨김, hint 텍스트 축소, preset 줄바꿈 허용 |
