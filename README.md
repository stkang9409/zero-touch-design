# Zero-Touch Design (`zero-touch-design`)

> **넓게 보고, 작게 자른다. 계획은 가설이고, 실물로 백지 비평한다.**

UI 화면, 랜딩 페이지, OG 이미지, 광고 소재, 디자인 시스템을 설계·검수할 때 **"스타일링 함정"**과 **"확인 편향"**을 없애는 전역 Antigravity 플러그인입니다.

## 무엇을 해결하는가

1. **Gate 0 존재 심사 & 매체별 정보 예산 (`design-gate`)**
   - 픽셀·색상을 만지기 전에 ① 메시지–초점 일치, ② 매체별 정보 예산(릴스 숫자 ≤ 2, 정적·캐러셀 숫자 ≤ 3, 다열 비교표 금지 등), ③ 삭제 질문(Cut-First), ④ 타 부서 요청 `What` vs `How` 분리를 먼저 통과합니다.
2. **6단계 실무 절차 (SOP) + Think Whole, Ship Thin + 백지 비평**
   - 전체 여정·인접 화면 맥락을 본 뒤, 구현은 **대표 1조각(1화면·1컷)**부터 완성·시각 검증해 가설을 확인합니다.
   - 실캡처(`390×844` · `1280×800`)를 볼 때 계획 준수가 아니라 처음 보는 눈으로 **"정말 좋은 디자인인가"**를 심사하고, 밋밋하거나 어색하면 4단계(구조 대안)로 되돌립니다.
3. **커스터마이징 가능한 80-15-5 기본 디자인 시스템 (`design-system`)**
   - 별도 설정이 없는 새 프로젝트에는 검증된 **Cool Stone & Royal Indigo (`80-15-5`)** 프리셋, 7단 타이포, 3화면 틀(`TabScreen` · `SubScreen` · `TaskScreen`), 자동 검수 테스트 템플릿을 제공합니다.
   - 기존 프로젝트의 `tokens.json` · `tailwind.config.*` · 전용 디자인 문서가 있으면 **1순위 오버라이드**로 존중하며, 브랜드 색·테마 극성·서체·반경·문체는 프로젝트에 맞게 자유롭게 바꿀 수 있습니다.

## 플러그인 구조

```text
zero-touch-design/
├── plugin.json
├── assets/logo.svg
├── rules/AGENTS.md                    # 경량 전역 라우터 (25줄)
└── skills/
    ├── design-gate/                   # Gate 0 · 6단계 SOP · 작업 분할 · 백지 비평
    │   ├── SKILL.md
    │   └── references/
    │       ├── media_budget.md        # 매체별 정보 예산표 · What/How 분리
    │       ├── principles_14.md       # 14원칙 · UX 카피 · 금지 UI 0건 목록
    │       └── layout_patterns.md     # 배치 패턴 카탈로그 · 5축 레이아웃 기준표
    └── design-system/                 # 3단계 오버라이드 · 기본 프리셋 · 템플릿
        ├── SKILL.md
        ├── references/
        │   ├── default_tokens.md      # Cool Stone & Royal Indigo 80-15-5
        │   ├── components_and_frames.md # 3화면 틀 · 부품 문법 · 접근성
        │   └── customization_guide.md # 커스터마이징 가능 축 vs 불변 가드레일
        └── templates/
            ├── tokens.template.json
            └── design-gate.test.template.ts
```

## 설치 및 업데이트

```bash
# 설치
git clone https://github.com/stkang9409/zero-touch-design.git ~/.gemini/config/plugins/zero-touch-design

# 업데이트
git -C ~/.gemini/config/plugins/zero-touch-design pull
```

## 프로젝트별 커스터마이징

- **기존 프로젝트**: 프로젝트 내 `tokens.json`, CSS `:root` 변수, 또는 `docs/**/design_guide.md`가 있으면 플러그인이 자동으로 프로젝트 규칙을 최우선 적용합니다.
- **새 프로젝트**: `"이 프로젝트에 zero-touch-design 토큰과 검수 테스트를 세팅해줘"` 또는 `"다크 + 에메랄드 테마로 커스터마이징해서 세팅해줘"`처럼 요청하면 `tokens.template.json`과 `design-gate.test.template.ts`를 기반으로 SSOT를 구성합니다.
