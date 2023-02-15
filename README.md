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

# UserEvent
[RTL 공식문서](https://testing-library.com/docs/user-event/intro)

userEvent는 프로미스를 리턴한다.
사용 전 setup후,
사용 할때 앞에 await 붙여주기

# Wrapper
<img width="792" alt="스크린샷 2023-02-16 오전 1 13 06" src="https://user-images.githubusercontent.com/104764474/219085757-384c2ae5-35da-44ed-8826-fbf2309b45ea.png">
