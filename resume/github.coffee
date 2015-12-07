show = (els)-> 
  if els.length
    e.style.display = 'block' for e in els
  else
    els.style.display = 'block';

hide = (els)-> 
  if els.length
    e.style.display = 'none' for e in els
  else
    els.style.display = 'none';

get =(x,parent = document) ->

  y = x.substr(1)
  switch x[0]
    when '.' then parent.getElementsByClassName(y)
    when '#' then parent.getElementById(y);
    else parent.getElementsByTagName(x)
  
setTabs = ->
  tabs = get('.tabs')[0];
  menuitems = get('li',tabs)
  hash = location.hash.substr(1) or menuitems[0].getAttribute 'href';
  (i.classList.remove('active'); if i.getAttribute('href') is hash then i.classList.add('active')) for i in menuitems
  hide get '.tab-items'
  show get '#'+hash
  true

tabs = get('.tabs')[0];
menuitems = get('li',tabs)
for item in menuitems
  item.addEventListener 'click', ->
    location.hash = this.getAttribute('href')
    setTabs()
for more in  get('.more')
  more.addEventListener 'click', ->
    p = this.parentNode.nextElementSibling.nextElementSibling
    p.style.display = if p.style.display is 'block' then 'none' else  'block'   
    true
fillskills = ->
  SKILLS = [
    {
      skill:'HTML',
      value:9,
      stack:'frontend'
    },
    {
      skill:'Angular JS',
      value:5,
      stack:'frontend'
    },
  {
      skill:'CSS',
      value:9,
      stack:'frontend'
    },
  {
      skill:'Javascript',
      value:8,
      stack:'frontend'
    },
  {
      skill:'JQuery',
      value:8,
      stack:'frontend'
    },
  {
      skill:' tornado',
      value:5,
      stack:'backend'
    },
  {
      skill:'flask',
      value:5,
      stack:'backend'
    },
  {
      skill:'Django',
      value:8,
      stack:'backend'
    },
    {
      skill:'Python',
      value:7,
      stack:'backend'
    },
    {
      skill:'GIT',
      value:5,
      stack:'others'
    },
    {
      skill:'nginx',
      value:3,
      stack:'others'
    },
    {
      skill:'Linux',
      value:4,
      stack:'others'
    },
  ]
  ul = get('#skillSet')
  for skill in SKILLS
    li = document.createElement "li"
    li.setAttribute "data-content", skill.skill
    span = document.createElement "span"
    span.classList.add "graph"
    span.classList.add skill.stack
    li.appendChild span
    setWidth span, skill.value*10
    ul.appendChild li

setWidth=(el,width) ->
  setTimeout ->
    el.style.width = width + '%'
  ,1000
  width
getRec =->
  xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = ->
    if xhttp.readyState is 4 and xhttp.status is 200
      data = JSON.parse(xhttp.responseText)
      src = get('#recTemplate')
      tar = get('#recontent')

      for recs in data.recommendationsReceived.values
        li = src.children[0].cloneNode(true);
        get('.name',li)[0].innerHTML = recs.recommender.firstName + recs.recommender.lastName 
        get('.title',li)[0].innerHTML = recs.recommender.headline;
        get('.content',li)[0].innerHTML = recs.recommendationText;
        get('.pic',li)[0].src = recs.recommender.pictureUrl;
        tar.appendChild(li);
  xhttp.open "GET", "rec.json", true
  xhttp.send();
  true
setTabs()
fillskills()
getRec()