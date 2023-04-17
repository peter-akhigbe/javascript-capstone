import add from '../index.js'

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
})

test("add li element", () => {
    document.body.innerHTML = `
        <ul>
            <li>item 1</li>
            <li>item 2</li>
        </ul>
    `

    const li = document.querySelectorAll('li')

    expect(li).toHaveLength(2)
})
