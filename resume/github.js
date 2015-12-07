
  var fillskills, get, getRec, hide, item, j, k, len, len1, menuitems, more, ref, setTabs, setWidth, show, tabs;

  show = function(els) {
    var e, j, len, results;
    if (els.length) {
      results = [];
      for (j = 0, len = els.length; j < len; j++) {
        e = els[j];
        results.push(e.style.display = 'block');
      }
      return results;
    } else {
      return els.style.display = 'block';
    }
  };

  hide = function(els) {
    var e, j, len, results;
    if (els.length) {
      results = [];
      for (j = 0, len = els.length; j < len; j++) {
        e = els[j];
        results.push(e.style.display = 'none');
      }
      return results;
    } else {
      return els.style.display = 'none';
    }
  };

  get = function(x, parent) {
    var y;
    if (parent == null) {
      parent = document;
    }
    y = x.substr(1);
    switch (x[0]) {
      case '.':
        return parent.getElementsByClassName(y);
      case '#':
        return parent.getElementById(y);
      default:
        return parent.getElementsByTagName(x);
    }
  };

  setTabs = function() {
    var hash, i, j, len, menuitems, tabs;
    tabs = get('.tabs')[0];
    menuitems = get('li', tabs);
    hash = location.hash.substr(1) || menuitems[0].getAttribute('href');
    for (j = 0, len = menuitems.length; j < len; j++) {
      i = menuitems[j];
      i.classList.remove('active');
      if (i.getAttribute('href') === hash) {
        i.classList.add('active');
      }
    }
    hide(get('.tab-items'));
    show(get('#' + hash));
    return true;
  };

  tabs = get('.tabs')[0];

  menuitems = get('li', tabs);

  for (j = 0, len = menuitems.length; j < len; j++) {
    item = menuitems[j];
    item.addEventListener('click', function() {
      location.hash = this.getAttribute('href');
      return setTabs();
    });
  }

  ref = get('.more');
  for (k = 0, len1 = ref.length; k < len1; k++) {
    more = ref[k];
    more.addEventListener('click', function() {
      var p;
      p = this.parentNode.nextElementSibling.nextElementSibling;
      p.style.display = p.style.display === 'block' ? 'none' : 'block';
      return true;
    });
  }

  fillskills = function() {
    var SKILLS, l, len2, li, results, skill, span, ul;
    SKILLS = [
      {
        skill: 'HTML',
        value: 9,
        stack: 'frontend'
      }, {
        skill: 'Angular JS',
        value: 5,
        stack: 'frontend'
      }, {
        skill: 'CSS',
        value: 9,
        stack: 'frontend'
      }, {
        skill: 'Javascript',
        value: 8,
        stack: 'frontend'
      }, {
        skill: 'JQuery',
        value: 8,
        stack: 'frontend'
      }, {
        skill: ' tornado',
        value: 5,
        stack: 'backend'
      }, {
        skill: 'flask',
        value: 5,
        stack: 'backend'
      }, {
        skill: 'Django',
        value: 8,
        stack: 'backend'
      }, {
        skill: 'Python',
        value: 7,
        stack: 'backend'
      }, {
        skill: 'GIT',
        value: 5,
        stack: 'others'
      }, {
        skill: 'nginx',
        value: 3,
        stack: 'others'
      }, {
        skill: 'Linux',
        value: 4,
        stack: 'others'
      }
    ];
    ul = get('#skillSet');
    results = [];
    for (l = 0, len2 = SKILLS.length; l < len2; l++) {
      skill = SKILLS[l];
      li = document.createElement("li");
      li.setAttribute("data-content", skill.skill);
      span = document.createElement("span");
      span.classList.add("graph");
      span.classList.add(skill.stack);
      li.appendChild(span);
      setWidth(span, skill.value * 10);
      results.push(ul.appendChild(li));
    }
    return results;
  };

  setWidth = function(el, width) {
    console.log(el + width);
    setTimeout(function() {
      return el.style.width = width + '%';
    }, 1000);
    return width;
  };

  getRec = function() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var data, l, len2, li, recs, ref1, results, src, tar;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        data = JSON.parse(xhttp.responseText);
        console.log(data);
        src = get('#recTemplate');
        tar = get('#recontent');
        ref1 = data.recommendationsReceived.values;
        results = [];
        for (l = 0, len2 = ref1.length; l < len2; l++) {
          recs = ref1[l];
          li = src.children[0].cloneNode(true);
          get('.name', li)[0].innerHTML = recs.recommender.firstName + recs.recommender.lastName;
          get('.title', li)[0].innerHTML = recs.recommender.headline;
          get('.content', li)[0].innerHTML = recs.recommendationText;
          get('.pic', li)[0].src = recs.recommender.pictureUrl;
          results.push(tar.appendChild(li));
        }
        return results;
      }
    };
    xhttp.open("GET", "rec.json", true);
    xhttp.send();
    return true;
  };

  setTabs();

  fillskills();

  getRec();
