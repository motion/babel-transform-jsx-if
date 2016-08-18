const idFn = _ => _

export default {
  enter(path) {
    const el = node.openingElement

    // process attributes
    if (!el.attributes) return

    let iff = idFn

    // find if
    for (let attr of el.attributes) {
      const attrName = attr.name && attr.name.name
      const expr = attr.value && (attr.value.expression || t.literal(attr.value.value))

      if (attrName == 'if') {
        iff = node => t.logicalExpression('&&', t.callExpression(t.identifier('iff'), [expr]), node)
      }
    }

    // wrap if
    return iff(node)
  }
}
