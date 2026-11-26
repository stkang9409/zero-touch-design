---
name: design-system
description: >-
  Provides a production-ready default 80-15-5 design system (Cool Stone & Royal Indigo), semantic tokens, 7-step typography, screen frames, component grammar, and a safe customization/override architecture. Use when setting up UI tokens, themes, Tailwind configs, components, screen frames, or starter design tests, or when adapting the system to a project's custom brand colors, dark mode, or fonts.
---

# Zero-Touch Design System (`design-system`)

새 프로젝트는 즉시 조립 가능한 완성형 기본 프리셋(**Cool Stone & Royal Indigo**, `80-15-5`)을 제공하고, 기존 프로젝트는 로컬 오버라이드를 최우선 존중하는 **커스터마이징 가능한 디자인 시스템** 스킬이다.

## 1. 3단계 오버라이드 우선순위 (Override Priority)

디자인 토큰·테마·부품을 적용하기 전에 반드시 아래 순서로 현재 프로젝트의 기준을 탐지한다.

1. **1순위 — 프로젝트 로컬 오버라이드**: 작업 디렉토리 안에 아래 파일이 있으면 그 값이 최우선이다. 기본 프리셋 색상·서체로 덮어쓰지 않는다.
   - 토큰/설정 파일: `tokens.json`, `design/tokens.json`, `tailwind.config.*`, `index.css` / `globals.css` (`:root` CSS 변수)
   - 프로젝트 전용 디자인 문서: `docs/**/design_guide.md`, `docs/**/design_system*.md`
   - *참고: 프로젝트 문서가 색상·서체·컴포넌트를 따로 정했더라도, 불변 가드레일(§2)은 그대로 유지한다.*
2. **2순위 — 세션 커스터마이징 요청**: 사용자가 "다크 테마 + 에메랄드 강조색", "둥근 모서리 줄이기", "영문 전용 산세리프" 등 변경을 지정하면 기본 프리셋에서 해당 축만 오버라이드한다. 상세 절차는 [references/customization_guide.md](./references/customization_guide.md)를 따른다.
3. **3순위 — 플러그인 기본 프리셋**: 별도 지정이 없으면 내장 기본 프리셋([references/default_tokens.md](./references/default_tokens.md) + [references/components_and_frames.md](./references/components_and_frames.md))을 그대로 사용한다.

## 2. 커스터마이징 가능 영역 vs 불변 가드레일 (Invariant Floor)

| 구분 | 항목 | 정책 |
| :--- | :--- | :--- |
| **커스터마이징 가능 (Overridable)** | 브랜드 강조색(`brand`), 라이트/다크 기본 극성, 서체 스택(`fontSans`·`fontDisplay`), 반경(`radius`) 성격, 그림자 강도, 문체(`해요체`/`합니다체`/English), 도메인 전용 컴포넌트 | 프로젝트 `tokens.json` 또는 1줄 지시로 자유롭게 변경 가능 |
| **불변 가드레일 (Locked Floor)** | `80-15-5` 색 면적 법칙, WCAG AA 대비(`>= 4.5:1` 본문 · `>= 3.0:1` 큰 글자/컨트롤), `44×44px` 최소 터치 표적, 뷰포트당 주 버튼 최대 1개, 단일 토큰 원본(SSOT) 유지, 하드코딩 HEX/Raw 팔레트 금지, 금지 UI·모션·카피(`eyebrow`·장식 알약·`transition-all`·엠대시 `—`) 0건 | 어떤 테마·브랜드로 커스터마이징해도 깨뜨릴 수 없음 |

## 3. 워크플로우별 실행 가이드

### A. 새 프로젝트 부트스트랩 (토큰·테스트 세팅)

1. 프로젝트의 CSS/Tailwind 구조와 커스터마이징 여부(예: 브랜드 색·다크 모드)를 확인한다.
2. [templates/tokens.template.json](./templates/tokens.template.json)을 프로젝트 경로(예: `src/design/tokens.json`)에 복사하고, 필요한 오버라이드 키(`color`, `typography`, `radius` 등)만 반영한다.
3. [references/default_tokens.md](./references/default_tokens.md)의 `:root` RGB CSS 변수와 Tailwind 시맨틱 매핑을 연결해 **단일 토큰 원본(SSOT)**을 고정한다.
4. [templates/design-gate.test.template.ts](./templates/design-gate.test.template.ts)를 테스트 경로(예: `src/design/tokens.test.ts`)로 복사하고 경로를 맞춰 정적 게이트(`npm test`)를 활성화한다.

### B. 화면·컴포넌트 구현

1. `design-gate` 스킬의 Gate 0과 구조 대안 비교를 통과한 뒤 착수한다.
2. [references/components_and_frames.md](./references/components_and_frames.md)의 3화면 틀(`TabScreen` · `SubScreen` · `TaskScreen`)과 부품 문법(`Hero` · `Section` · `RowList` · `Chip` vs `Badge` · `BottomSheet` · `PrimaryButton` max-1)을 우선 재사용한다.
3. 랜딩·블로그 등 신규 웹 페이지 첫 화면은 마케팅 히어로 없이 본문·작업 화면으로 열어야 할 도구·문서 화면인지 구분하고, 신규 마케팅 랜딩은 기계적 50/50 분할 대신 전체 폭 헤드라인·풀블리드·상호작용 무대를 우선 검토한다.
4. 구현 후 모바일(`390×844`)·데스크톱(`1280×800`) 실캡처와 자동 테스트(`tokens.test.ts`)로 마감한다.
