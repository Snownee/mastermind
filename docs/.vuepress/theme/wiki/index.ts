import DOM from '@vue/compiler-dom'

export const parse = (html: string, base: string): WikiCategory[] => {
  const root = DOM.parse(html)
  const cates: WikiCategory[] = []
  let cate = new WikiCategory()
  let info = new WikiInfo()
  for (const node of root.children) {
    if (node.type === 1) { // NodeTypes.ELEMENT
      var el = node as DOM.ElementNode
      if (el.tag === 'h1') {
        if (info.main !== '') {
          cate.infos.push(info)
          info = new WikiInfo()
        }
        if (cate.infos.length > 0) {
          cates.push(cate)
          cate = new WikiCategory()
        }
        for (const child of el.children) {
          cate.name += child.loc.source
        }
        continue
      }
      if (el.tag === 'h2') {
        if (info.main !== '') {
          cate.infos.push(info)
          info = new WikiInfo()
        }
        for (const child of el.children) {
          info.head += child.loc.source
        }
      }
      if (el.tag === 'p' && info.icon === '') {
        if (el.children.length === 1 && el.children[0].type === 1) {
          var child = el.children[0] as DOM.ElementNode
          if (child.tag === 'img') {
            for (const attr of child.props) {
              if (attr['name'] === 'src') {
                info.icon = attr['value']['content']
                if (info.icon.startsWith('/')) {
                  info.icon = base + info.icon.substr(1)
                }
              }
            }
            continue
          }
        }
      }
      info.main += el.loc.source
    }
  }
  if (info.main !== '') {
    cate.infos.push(info)
  }
  if (cate.infos.length > 0) {
    cates.push(cate)
  }
  return cates
}

export class WikiCategory {
  name = ''
  infos: WikiInfo[] = []
}

export class WikiInfo {
  main = ''
  icon = ''
  head = ''
  classes = {
    selected: false,
    fade: false
  }
}
