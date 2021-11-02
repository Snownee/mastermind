import Markdown from 'markdown-it'
import { RuleCore } from 'markdown-it/lib/parser_core'
import StateCore from 'markdown-it/lib/rules_core/state_core'

const arr = [
  ['超级罕见', 'red'],
  ['罕见', 'purple'],
  ['稀少', 'green'],
  ['不常见', 'yellow'],
  ['常见', 'brown'],
  ['活动', 'orange'],
]
const map = new Map<string, string>()
arr.forEach(e => map.set(e[0], `[${e[0]}]{.${e[1]}}`))

let enter = false;

const mastermind: RuleCore = (state: StateCore) => {
  if (enter) {
    return
  }
  enter = true
  let match = 0;
  for (let i = 0; i < state.tokens.length; i++) { // find the second paragraph under every <h2>
    const token = state.tokens[i]
    if (token.type === 'heading_open' && token.tag === 'h2') {
      match = 1
    } else if (match > 0 && token.type === 'paragraph_open') {
      match++
    } else if (token.type === 'inline') {
      let content = token.content
      if (match === 3) {
        content = content.replace(/超级罕见|罕见|稀少|不常见|常见|活动/g, s => map.get(s) ?? s)
        state.tokens = state.md.utils.arrayReplaceAt(state.tokens, i, state.md.parseInline(content, state.env))
      } else if (content.search('{.tiers}') !== -1) {
        content = content.replace(/\[(.+?)\/(.+?)\/(.+?)\]\{\.tiers\}/g, '[$1]{.yellow}/[$2]{.green}/[$3]{.purple}')
        let tokens = state.md.parseInline(content, state.env)
        state.tokens = state.md.utils.arrayReplaceAt(state.tokens, i, tokens)
      }
    }
  }
  enter = false
}

let md = Markdown()
md.core.ruler.push('mastermind', mastermind)

let src = `
## 百折不挠

![](/images/perk/survivors/resilience.png)

不常见/稀少/超级罕见-通用技能

极端情境激发了你的[3%/6%/9%]{.tiers}雄心壮志。当你受伤时，额外增加[3%/6%/9%]{.tiers} 的修理、破坏、治疗、解救队友、翻越、清除图腾、打开逃生门以及搜索箱子的速度。

> “就算是在绝望的时刻，也要集中精神奋力一搏。”

::: tip
只要处于受伤状态就能获得增益，如果携带不痛不痒则进入游戏时就可以获得互动加速增益。  —— Calypso
:::
`

let res = md.render(src)
console.log(res);

