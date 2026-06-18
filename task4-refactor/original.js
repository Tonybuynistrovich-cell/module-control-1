// Оригінальний legacy-код із code smells (дано за умовою завдання).
function process(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].active == true) {
      if (d[i].age > 18) {
        r.push(d[i].name + " - " + d[i].age);
      }
    }
  }
  return r;
}

module.exports = { process };
