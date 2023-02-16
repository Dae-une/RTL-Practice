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


# 테스트 코드 짜기 전에...

1. 무엇을 렌더링 할 것인가?
테스테에 필요한 모든 것을 포함한 가능한 가장 작은 컴포넌트를 렌더링하자.
무엇을 테스트하냐에 따라 다르다

2. 컴포넌트를 렌더링할 때 어떤 프로퍼티를 전달해야할지 생각하자.

3. 프로바이더로 wrap을 해야하나?
프로바이더가 사용 되었나?

4. 테스트가 실행 될 곳은 어디인가?
어떤 파일을 사용해야 하나
특정 컴포넌트를 위한 유닛 테스트인가, 아니면 기능 테스트인가
테스트에 새로운 파일이 필요한가, 기존 파일에 사용 가능한가

5. 테스트의 대상이 무엇인가?
- 어떤 쿼리를 사용할 것인가
- 비동기가 있는가
