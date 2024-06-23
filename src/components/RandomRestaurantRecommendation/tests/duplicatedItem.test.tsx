describe('중복되는 아이템이 존재하는지 테스트', () => {
  test('중복되는 아이템 삭제 확인', () => {
    const items = ['apple', 'banana', 'apple', 'orange', 'banana', 'orange']
    const uniqueItems = Array.from(new Set(items))
    expect(uniqueItems).toEqual(['apple', 'banana', 'orange'])
  })

  test('중복 삭제 작업 후 순서 유지 확인', () => {
    const items = ['apple', 'orange', 'banana', 'apple', 'orange']
    const uniqueItems = Array.from(new Set(items))
    expect(uniqueItems).toEqual(['apple', 'orange', 'banana'])
  })
})
