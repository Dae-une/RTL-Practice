React Tesing Library 공부용

# screen Query Methods

[RTL 공식문서](https://testing-library.com/docs/queries/about/)
'coomand'[all]By'QueryType'
command

- get: 돔 안에 요소가 있을 때
- query: 돔 안에 요소가 없을 때
- find: 비동기 적으로 요소가 나타날 때

All

- exclude: 한가지만 찾을 때
- include: 하나 이상을 찾을 때

QueryType

- Role :대부분 권장, 웹접근성을 지킬 수 있어 좋음
- AltText : 이미지
- Text : 보이는 요소
- Form elmnets : PlaceholderText,LabelText,DisplayValue
