it('데이터를 카테고리별로 넘겨주어야 한다', async () => {
  //given
  class testAPI {
    constructor() {
      this.api = new API();
    }
    //when
    async test() {
      const res = await this.api.get('keyword_search', { keyword: 'test' });
      return res;
    }
    //then
  }
});
