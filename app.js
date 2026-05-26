const SFX = (() => { let ctx = null; function getCtx() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; } function play(fn) { try { fn(getCtx()); } catch(e) {} } function beep(freq, type, dur, vol, delay, c) { const o = c.createOscillator(), g = c.createGain(); o.connect(g); g.connect(c.destination); o.type = type; o.frequency.setValueAtTime(freq, c.currentTime + delay); g.gain.setValueAtTime(0, c.currentTime + delay); g.gain.linearRampToValueAtTime(vol, c.currentTime + delay + 0.01); g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur); o.start(c.currentTime + delay); o.stop(c.currentTime + delay + dur + 0.05); } return { correct() { play(c => { beep(523,'sine',.12,.22,0,c); beep(659,'sine',.12,.22,.09,c); beep(784,'sine',.2,.28,.18,c); }); }, wrong() { play(c => { const o1 = c.createOscillator(), g1 = c.createGain(); o1.type = 'sine'; o1.frequency.setValueAtTime(280, c.currentTime); o1.frequency.exponentialRampToValueAtTime(140, c.currentTime + 0.22); g1.gain.setValueAtTime(0, c.currentTime); g1.gain.linearRampToValueAtTime(0.28, c.currentTime + 0.01); g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.28); o1.connect(g1); g1.connect(c.destination); o1.start(c.currentTime); o1.stop(c.currentTime + 0.3); const o2 = c.createOscillator(), g2 = c.createGain(); o2.type = 'sawtooth'; o2.frequency.setValueAtTime(180, c.currentTime); o2.frequency.exponentialRampToValueAtTime(90, c.currentTime + 0.12); g2.gain.setValueAtTime(0, c.currentTime); g2.gain.linearRampToValueAtTime(0.12, c.currentTime + 0.01); g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15); o2.connect(g2); g2.connect(c.destination); o2.start(c.currentTime + 0.04); o2.stop(c.currentTime + 0.2); }); }, click() { play(c => { beep(880,'sine',.05,.1,0,c); }); }, complete() { play(c => { [523,659,784,1047].forEach((f,i) => beep(f,'sine',.2,.3,i*.1,c)); beep(1568,'sine',.35,.18,.4,c); }); }, boss() { play(c => { [523,659,784,523,659,784,1047].forEach((f,i) => beep(f,'sine',.18,.3,i*.08,c)); beep(1568,'sine',.5,.25,.6,c); beep(2093,'sine',.5,.2,.75,c); }); }, unlock() { play(c => { [440,587,740,988].forEach((f,i) => beep(f,'sine',.1,.18,i*.08,c)); }); }, xp() { play(c => { beep(1047,'sine',.06,.1,0,c); beep(1319,'sine',.06,.12,.06,c); }); }, start() { play(c => { beep(330,'sine',.1,.18,0,c); beep(440,'sine',.15,.22,.07,c); }); } }; })(); function spawnConfetti(x, y, count) { count = count || 22; const colors = ['#b39ddb','#7ab8f5','#7dd4b0','#fdd663','#ffb4a2','#f48fb1','#fff']; for (let i = 0; i < count; i++) { const el = document.createElement('div'); el.className = 'confetti-p'; const size = 6 + Math.random() * 7; el.style.cssText = 'width:'+size+'px;height:'+size+'px;background:'+colors[Math.floor(Math.random()*colors.length)]+';left:'+(x+(Math.random()-.5)*100)+'px;top:'+y+'px;animation-duration:'+(.7+Math.random()*.9)+'s;animation-delay:'+(Math.random()*.2)+'s;'; document.body.appendChild(el); setTimeout(function(){ el.remove(); }, 1300); } } function spawnStars(x, y, count) { count = count || 5; const icons = ['🧠','✨','💫','🌟']; for (let i = 0; i < count; i++) { const el = document.createElement('div'); el.className = 'star-burst'; el.textContent = icons[Math.floor(Math.random()*icons.length)]; el.style.cssText = 'left:'+(x+(Math.random()-.5)*70)+'px;top:'+(y+(Math.random()-.5)*50)+'px;animation-delay:'+(i*.07)+'s;'; document.body.appendChild(el); setTimeout(function(){ el.remove(); }, 950); } } function addRipple(el, e) { const r = document.createElement('span'); r.className = 'ripple'; const rect = el.getBoundingClientRect(); const size = Math.max(rect.width, rect.height); const cx = (e && e.clientX) ? e.clientX : rect.left+rect.width/2; const cy = (e && e.clientY) ? e.clientY : rect.top+rect.height/2; r.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+(cx-rect.left-size/2)+'px;top:'+(cy-rect.top-size/2)+'px'; el.appendChild(r); setTimeout(function(){ r.remove(); }, 650); } document.addEventListener('click', function(e) { const el = e.target.closest('.opt,.btn-next,.btn-continue,.btn-start,.btn-save,.level-row,.world-header'); if (el && !el.classList.contains('locked')) addRipple(el, e); }); const WORLDS = [ { id:1, name:'Foundations', icon:'🌱', color:'#6d28d9', desc:'Los pilares del inglés', levels:[ {id:1, name:'Verb To Be', sub:'am / is / are', boss:false, xp:100, qs:[ {es:'Soy estudiante.',en:'I ___ a student.',blank:'am',opts:['am','is','are'],ans:0,tip:'Para we/they/you usamos "are", y para he/she/it usamos "is"... ¿entonces para I qué forma queda?'}, {es:'Ella es doctora.',en:'She ___ a doctor.',blank:'is',opts:['am','is','are'],ans:1,tip:'Recuerda: "am" es solo para I, "are" es para we/they/you... ¿cuál queda para she/he/it?'}, {es:'Ellos son amigos.',en:'They ___ friends.',blank:'are',opts:['am','is','are'],ans:2,tip:'"Am" solo va con I, "is" solo va con he/she/it... ¿cuál forma le toca a they/we/you?'}, {es:'Tú eres muy amable.',en:'You ___ very kind.',blank:'are',opts:['am','is','are'],ans:2,tip:'I → am. He/she/it → is. We/they → are. ¿Y you? Va con el mismo grupo que we y they...'}, {es:'El perro está aquí.',en:'The dog ___ here.',blank:'is',opts:['am','is','are'],ans:1,tip:'"The dog" puede sustituirse por "it" (singular). Si it → is, ¿qué usamos para "the dog"?'}, ]}, {id:2, name:'Pronombres', sub:'I, You, He, She...', boss:false, xp:100, qs:[ {es:'Mi mamá trabaja mucho.',en:'___ works a lot.',blank:'She',opts:['He','She','They'],ans:1,tip:'Los pronombres son: I, you, he, she, it, we, they. Mi mamá es mujer, ¿cuál usamos para ella?'}, {es:'Juan y yo somos hermanos.',en:'___ are brothers.',blank:'We',opts:['We','They','You'],ans:0,tip:'"Juan" solo sería "he". "Yo" solo sería "I". Pero Juan y YO juntos, ¿qué pronombre somos?'}, {es:'El gato duerme.',en:'___ sleeps.',blank:'It',opts:['He','It','She'],ans:1,tip:'He = hombre, she = mujer. Un gato no es ni hombre ni mujer. ¿Cuál pronombre queda para cosas/animales?'}, {es:'Tú y Pedro son amigos.',en:'___ are friends.',blank:'You',opts:['We','You','They'],ans:1,tip:'Hablamos de ti y Pedro juntos. He = él solo, we = tú y yo. ¿Cuál pronombre es para "tú y alguien más"?'}, {es:'Mi papá cocina bien.',en:'___ cooks well.',blank:'He',opts:['He','She','It'],ans:0,tip:'She es para mujeres, it para cosas. Mi papá es hombre, ¿cuál de los tres pronombres le corresponde?'}, ]}, {id:3, name:'Artículos', sub:'a / an / the', boss:false, xp:100, qs:[ {es:'Tengo un gato.',en:'I have ___ cat.',blank:'a',opts:['a','an','the'],ans:0,tip:'"A cat" (consonante), "an apple" (vocal). La siguiente palabra empieza por consonante, ¿cuál artículo va?'}, {es:'Ella come una manzana.',en:'She eats ___ apple.',blank:'an',opts:['a','an','the'],ans:1,tip:'"A" va con consonantes, "an" con vocales. ¿Con qué letra empieza "apple"?'}, {es:'El cielo es azul.',en:'___ sky is blue.',blank:'The',opts:['A','An','The'],ans:2,tip:'"A/an" presentan algo nuevo. Si el cielo es único (solo hay uno), ¿cuál artículo usamos?'}, {es:'Quiero un helado.',en:'I want ___ ice cream.',blank:'an',opts:['a','an','the'],ans:1,tip:'"A" + consonante, "an" + vocal. Ice cream empieza con el sonido de una vocal, ¿cuál artículo va?'}, {es:'El presidente habló.',en:'___ president spoke.',blank:'The',opts:['A','An','The'],ans:2,tip:'El presidente es uno solo en el contexto. "A" presenta algo nuevo, "the" señala algo conocido/único. ¿Cuál?'}, ]}, {id:4, name:'Plural', sub:'Singular y plural', boss:false, xp:100, qs:[ {es:'Tengo dos gatos.',en:'I have two ___.',blank:'cats',opts:['cat','cats','cates'],ans:1,tip:'En inglés, la mayoría de plurales se forman con una regla muy simple al final de la palabra. ¿Cuál opción sigue esa regla con "cat"?'}, {es:'Veo tres autobuses.',en:'I see three ___.',blank:'buses',opts:['bus','buses','buss'],ans:1,tip:'"Bus" termina en "s". Cuando una palabra ya termina en ese sonido, simplemente agregar -s no suena bien. ¿Cuál opción suena natural?'}, {es:'Los niños juegan.',en:'The ___ play.',blank:'children',opts:['childs','childrens','children'],ans:2,tip:'"Childs" y "childrens" seguirían reglas normales. Pero child es una de las palabras que tiene su propio plural especial. ¿Cuál se ve diferente a las demás?'}, {es:'Mis pies duelen.',en:'My ___ hurt.',blank:'feet',opts:['foots','feet','feets'],ans:1,tip:'"Foots" añade -s normalmente. "Feets" añade -s y cambia algo. ¿Cuál opción cambia la vocal interna sin añadir -s?'}, {es:'Tengo dos relojes.',en:'I have two ___.',blank:'watches',opts:['watchs','watches','watch'],ans:1,tip:'"Watch" termina en -ch, igual que "bus" termina en -s. ¿Recuerdas qué añadimos a "bus" para el plural? Aplica la misma regla.'}, ]}, {id:5, name:'Present Continuous', sub:'Estar + -ing', boss:false, xp:100, qs:[ {es:'Estoy comiendo.',en:'I am ___.',blank:'eating',opts:['eat','eating','ate'],ans:1,tip:'"I am eat" no suena correcto. El presente continuo necesita algo más después del verbo. ¿Qué opción tiene am/is/are + verbo modificado?'}, {es:'Ella está corriendo.',en:'She is ___.',blank:'running',opts:['run','runned','running'],ans:2,tip:'"Run" termina en n (consonante). Antes tiene u (vocal). Antes de u tiene r (consonante). ¿Cuál opción duplica esa última consonante antes del -ing?'}, {es:'Estamos hablando.',en:'We are ___.',blank:'talking',opts:['talk','talked','talking'],ans:2,tip:'"Talk" termina en consonantes dobles (lk), sin el patrón especial. ¿Cuál opción simplemente agrega -ing sin cambiar nada?'}, {es:'¿Qué estás haciendo?',en:'What are you ___?',blank:'doing',opts:['do','does','doing'],ans:2,tip:'"Do" termina en -e (aunque no suene). Cuando un verbo termina en -e, esa letra desaparece antes del -ing. ¿Cuál opción refleja eso?'}, {es:'Ellos están durmiendo.',en:'They are ___.',blank:'sleeping',opts:['sleep','sleeped','sleeping'],ans:2,tip:'"Sleep" termina en -ep. Mira: ee son dos vocales juntas. Con dos vocales juntas, no se dobla. ¿Cuál opción solo añade -ing?'}, ]}, {id:'1b', name:'JEFE — Mundo 1', sub:'¡Construye oraciones completas!', boss:true, xp:500, qs:[ {es:"Mi hermana está leyendo un libro.",en:"My sister ___ reading a book.",blank:"is",opts:["is","are","am"],ans:0,tip:"Sister → She → <strong>is</strong>. Un libro → <strong>a book</strong>."}, {es:"Nosotros somos estudiantes.",en:"___ are students.",blank:"We",opts:["We","They","is"],ans:0,tip:"Nosotros → <strong>We</strong>. Varios → plural <strong>students</strong>."}, {es:"Él tiene una naranja y dos manzanas.",en:"He has ___ orange and two apples.",blank:"an",opts:["an","a","is"],ans:0,tip:"Orange empieza por vocal → <strong>an</strong>. Dos = plural <strong>apples</strong>."}, {es:"¿Están ellos comiendo en el restaurante?",en:"Are they ___ in the restaurant?",blank:"eating",opts:["eating","eat","is"],ans:0,tip:"Continuo → <strong>eating</strong>. El restaurante → <strong>the</strong>."}, {es:'Los niños no están jugando.',en:'The children are not ___.',blank:'playing',opts:['play','played','playing'],ans:2,tip:'Negativo continuo: are not + <strong>verbo-ing</strong>.'}, ]}, ] }, { id:2, name:'First Conversations', icon:'🌎', color:'#0ea5e9', desc:'Habla con el mundo', levels:[ {id:6, name:'Saludos', sub:'Hello, Hi, Good morning...', boss:false, xp:100, qs:[ {es:'Buenos días.',en:'___ morning.',blank:'Good',opts:['Good','Fine','Nice'],ans:0,tip:'En inglés, los saludos del día se forman con Good + el momento del día. Morning = mañana, afternoon = tarde, evening = noche. ¿Cuál va aquí?'}, {es:'¿Cómo estás?',en:'How ___ you?',blank:'are',opts:['is','am','are'],ans:2,tip:'"How am you?" o "How is you?" suenan extraño. Con you, ¿cuál forma del to be usamos?'}, {es:'Estoy bien, gracias.',en:"I'm fine, ___.",blank:'thank you',opts:['please','thank you','sorry'],ans:1,tip:'"Please" pide algo. "Sorry" se disculpa. Para agradecer, ¿cuál de las tres opciones encaja con "fine,___"?'}, {es:'¡Hasta luego!',en:'___ you later!',blank:'See',opts:['See','Look','Watch'],ans:0,tip:'"See" = ver. "Look" y "watch" también significan mirar pero no se usan en esta despedida. ¿Cuál verbo significa "verte" en sentido de "nos vemos"?'}, {es:'¿Qué hay de nuevo?',en:"What's ___?",blank:'up',opts:['new','up','there'],ans:1,tip:'Las otras opciones no forman esta expresión coloquial. ¿Cuál pequeña palabra completa "What\'s ___?" para preguntar ¿qué hay de nuevo?'}, ]}, {id:7, name:'Presentarse', sub:'My name is...', boss:false, xp:100, qs:[ {es:'Me llamo Ana.',en:'My ___ is Ana.',blank:'name',opts:['name','age','job'],ans:0,tip:'"My age is Ana" o "My job is Ana" no tienen sentido. ¿Qué palabra personal te identifica por cómo te llamas?'}, {es:'Tengo 25 años.',en:'I ___ 25 years old.',blank:'am',opts:['have','am','are'],ans:1,tip:'En español decimos "tengo" años, pero en inglés la edad usa el verbo to be. ¿Cuál forma de to be va con I?'}, {es:'Soy de España.',en:'I ___ from Spain.',blank:'am',opts:['come','am','go'],ans:1,tip:'"I go from" suena como movimiento. "I come from" o "I am from" indican origen. Con to be, ¿cuál forma va con I?'}, {es:'Trabajo como profesor.',en:'I work ___ a teacher.',blank:'as',opts:['like','as','for'],ans:1,tip:'"I work like" compara. "I work for" indica para quién. Para decir tu profesión/rol, ¿cuál preposición significa "en calidad de"?'}, {es:'Es un placer conocerte.',en:'Nice to ___ you.',blank:'meet',opts:['see','meet','know'],ans:1,tip:'"See" = ver. "Know" = saber/conocer a alguien ya. Cuando es la primera vez que te presentan, ¿qué verbo usas?'}, ]}, {id:8, name:'Preguntar nombres', sub:'What\'s your name?', boss:false, xp:100, qs:[ {es:'¿Cómo te llamas?',en:"What's your ___?",blank:'name',opts:['name','age','phone'],ans:0,tip:'<strong>What\'s your name?</strong> = ¿Cómo te llamas?'}, {es:'¿De dónde eres?',en:'Where are you ___?',blank:'from',opts:['from','going','at'],ans:0,tip:'<strong>Where are you from?</strong> = ¿De dónde eres?'}, {es:'¿Cuántos años tienes?',en:'How ___ are you?',blank:'old',opts:['many','old','much'],ans:1,tip:'<strong>How old</strong> = ¿cuántos años? Expresión fija.'}, {es:'¿En qué trabajas?',en:'What do you ___?',blank:'do',opts:['do','make','work'],ans:0,tip:'<strong>What do you do?</strong> = ¿En qué trabajas? (pregunta por profesión)'}, {es:'¿Hablas inglés?',en:'Do you speak ___?',blank:'English',opts:['English','England','Englishly'],ans:0,tip:'El idioma es <strong>English</strong>, el país es England.'}, ]}, {id:9, name:'Gustos', sub:'I like / I don\'t like', boss:false, xp:100, qs:[ {es:'Me gusta el fútbol.',en:'I ___ football.',blank:'like',opts:['like','likes','liked'],ans:0,tip:'Con he/she/it, los verbos en presente llevan -s. Con I, no. "I likes" o "I like"... ¿cuál suena correcto?'}, {es:'No me gusta el café.',en:"I ___ like coffee.",blank:"don't",opts:["don't","doesn't","not"],ans:0,tip:'<strong>I don\'t like</strong> = no me gusta. Con I/You/We/They.'}, {es:'¿Te gusta la música?',en:'Do you ___ music?',blank:'like',opts:['like','likes','liking'],ans:0,tip:'"Do you likes?" es incorrecto porque con do/does el verbo queda en su forma base. ¿Cuál opción es el verbo sin modificar?'}, {es:'A ella le encanta bailar.',en:'She ___ dancing.',blank:'loves',opts:['love','loves','is loving'],ans:1,tip:'She necesita verbo con -s en presente simple. "Love" sería para I/we/you. ¿Cuál opción añade la -s correcta?'}, {es:'Odio madrugar.',en:'I ___ waking up early.',blank:'hate',opts:['hate','hates','hating'],ans:0,tip:'Hate, love y like van seguidos de gerundio (-ing) cuando el segundo verbo es acción. "Hate + wake up" o "hate + waking up"... ¿cuál opción tiene la forma correcta?'}, ]}, {id:10, name:'Conversación corta', sub:'Small talk básico', boss:false, xp:100, qs:[ {es:'¿Qué tiempo hace?',en:"What's the ___ like?",blank:'weather',opts:['weather','climate','air'],ans:0,tip:'"What\'s the climate like?" y "What\'s the air like?" no se dicen así. ¿Cuál sustantivo se refiere específicamente a la condición atmosférica del momento?'}, {es:'Hace calor hoy.',en:"It's ___ today.",blank:'hot',opts:['hot','heat','heated'],ans:0,tip:'"Heat" y "heated" son sustantivo/adjetivo pasado. Para describir temperatura con "It\'s...", necesitas un adjetivo. ¿Cuál opción es el adjetivo?'}, {es:'¿Adónde vas?',en:'Where are you ___?',blank:'going',opts:['go','goes','going'],ans:2,tip:'"Go" y "goes" son presente simple. La pregunta usa "are you", que pide la forma continua. ¿Cuál opción tiene el -ing?'}, {es:'Voy al trabajo.',en:"I'm going to ___.",blank:'work',opts:['the work','work','a work'],ans:1,tip:'"The work" y "a work" añaden artículo. Lugares de actividad rutinaria como work, school, bed van sin artículo en inglés. ¿Cuál opción lo omite?'}, {es:'¡Qué interesante!',en:'How ___!',blank:'interesting',opts:['interested','interesting','interest'],ans:1,tip:'"Interested" describe al que siente interés. "Interest" es sustantivo. Para exclamar sobre algo que ES interesante, ¿cuál forma del adjetivo usamos?'}, ]}, {id:'2b', name:'JEFE — Mundo 2', sub:'Mantén el hilo de una conversación', boss:true, xp:500, qs:[ {es:'Alguien dice: "Hi! How are you?"',en:'Tú respondes: "I\'m ___, thank you!"',blank:'fine',opts:['fine','good morning','from Spain'],ans:0,validAns:[0],tip:'<strong>I\'m fine, thank you!</strong> Respuesta estándar al saludo.'}, {es:'Preguntas su nombre.',en:'___ your name?',blank:"What's",opts:["What's","How's","Where's"],ans:0,tip:'<strong>What\'s your name?</strong> Pregunta el nombre.'}, {es:'Dice que es de México. Tú dices:',en:"Oh, ___ from Mexico!",blank:"you're",opts:["you're","your","you"],ans:0,tip:'You + are = <strong>you\'re</strong>. Contracción muy común.'}, {es:'Le preguntas si le gusta el cine.',en:'Do you ___ movies?',blank:'like',opts:['like','likes','liked'],ans:0,tip:'Con Do you → verbo base <strong>like</strong> sin -s.'}, {es:'Terminas la conversación.',en:'___ to meet you!',blank:'Nice',opts:['Nice','Good','Fine'],ans:0,tip:'<strong>Nice to meet you!</strong> Al despedirte de alguien que acabas de conocer.'}, ]}, ] }, { id:3, name:'Daily English', icon:'🏠', color:'#10b981', desc:'El inglés de cada día', levels:[ {id:11, name:'La casa', sub:'Rooms & furniture', boss:false, xp:100, qs:[ {es:'La cocina es grande.',en:'The ___ is big.',blank:'kitchen',opts:['kitchen','bedroom','bathroom'],ans:0,tip:'Bedroom = dormitorio, bathroom = baño. ¿Cuál de las tres habitaciones es donde se cocina la comida?'}, {es:'Me ducho en el baño.',en:'I shower in the ___.',blank:'bathroom',opts:['kitchen','living room','bathroom'],ans:2,tip:'Kitchen = cocina, living room = salón. Para ducharse, ¿en cuál habitación se hace?'}, {es:'Veo la tele en el salón.',en:'I watch TV in the ___ ___.',blank:'living room',opts:['living room','bed room','dining kitchen'],ans:0,tip:'"Bed room" (separado) y "dining kitchen" no son reales. El cuarto donde ves TV y recibes visitas, ¿cómo se llama?'}, {es:'Duermo en una cama.',en:'I sleep in a ___.',blank:'bed',opts:['sofa','bed','chair'],ans:1,tip:'Sofa = sofá, chair = silla. Para dormir, necesitas una... ¿cuál de los tres muebles es donde descansas por la noche?'}, {es:'La ventana está abierta.',en:'The ___ is open.',blank:'window',opts:['door','window','wall'],ans:1,tip:'Door = puerta, wall = pared. La que dejas abierta para que entre aire, ¿cómo se llama?'}, ]}, {id:12, name:'Comida', sub:'Food & drinks', boss:false, xp:100, qs:[ {es:'Me gusta el arroz.',en:'I like ___.',blank:'rice',opts:['rice','rise','race'],ans:0,tip:'"Rise" = subir, "race" = carrera. Solo una de las tres opciones es el alimento que se come. ¿Cuál?'}, {es:'Tengo hambre.',en:'I am ___.',blank:'hungry',opts:['hunger','hungry','thirsty'],ans:1,tip:'"Hunger" es el sustantivo, "thirsty" significa sed. Para decir que tienes hambre con "I am...", ¿cuál adjetivo usas?'}, {es:'¿Quieres algo de beber?',en:'Do you want something to ___?',blank:'drink',opts:['drink','eat','take'],ans:0,tip:'"Something to eat" = algo de comer. "Take" no implica consumir. Para beber, ¿cuál verbo usas?'}, {es:'El desayuno es a las ocho.',en:'___ is at eight.',blank:'Breakfast',opts:['Breakfast','Lunch','Dinner'],ans:0,tip:'Lunch = almuerzo, dinner = cena. La primera comida del día, la de la mañana, ¿cómo se llama?'}, {es:'Pago la cuenta.',en:'I pay the ___.',blank:'bill',opts:['bill','check','both are ok'],ans:2,tip:'En UK dicen "bill", en US dicen "check". ¿Cuál opción incluye ambas posibilidades correctas?'}, ]}, {id:13, name:'Rutina', sub:'Every day habits', boss:false, xp:100, qs:[ {es:'Me despierto a las siete.',en:'I wake ___ at seven.',blank:'up',opts:['up','on','in'],ans:0,tip:'"Wake on" y "wake in" no son phrasal verbs reales. La pequeña palabra que completa "wake" para significar "despertarse" es... ¿cuál?'}, {es:'Luego me ducho.',en:'Then I take a ___.',blank:'shower',opts:['shower','bath','swim'],ans:0,tip:'"Take a swim" = nadar. "Take a bath" = bañarse (en tina). Para ducharse con regadera, ¿cuál opción usamos?'}, {es:'Desayuno antes de trabajar.',en:'I have ___ before work.',blank:'breakfast',opts:['breakfast','lunch','dinner'],ans:0,tip:'Lunch = almuerzo, dinner = cena. La que se toma antes de ir a trabajar, por la mañana, ¿cómo se llama?'}, {es:'Voy al trabajo en metro.',en:'I go to work by ___.',blank:'subway',opts:['subway','train','foot'],ans:0,tip:'Train = tren (sobre tierra). Foot = a pie. Para el transporte subterráneo de la ciudad, ¿cuál opción usamos?'}, {es:'Me acuesto a las once.',en:'I go to ___ at eleven.',blank:'bed',opts:['bed','sleep','rest'],ans:0,tip:'"Go to sleep" también es correcto. "Go to rest" no es común. La frase más estándar para acostarse al final del día es "go to ___"... ¿cuál?'}, ]}, {id:14, name:'El tiempo', sub:'Weather & seasons', boss:false, xp:100, qs:[ {es:'Está lloviendo.',en:"It's ___.",blank:'raining',opts:['raining','rainy','rained'],ans:0,tip:'"Rainy" es adjetivo (it\'s rainy). "Rained" es pasado. Para describir lo que está pasando AHORA con el tiempo, ¿cuál forma del verbo usamos?'}, {es:'Hace mucho frío en invierno.',en:'It\'s very ___ in winter.',blank:'cold',opts:['cold','cool','freeze'],ans:0,tip:'Cool = fresco (no muy frío). Freeze = congelar (acción). Para decir que hace mucho frío en invierno, ¿cuál adjetivo usamos?'}, {es:'La primavera es mi estación favorita.',en:'Spring is my favorite ___.',blank:'season',opts:['season','weather','time'],ans:0,tip:'Weather = el estado del clima (sol, lluvia). Time = tiempo en general. Para referirse a primavera, verano, otoño o invierno, ¿cuál palabra usamos?'}, {es:'Hay niebla esta mañana.',en:'It\'s ___ this morning.',blank:'foggy',opts:['foggy','fog','fogged'],ans:0,tip:'"Fog" es el sustantivo. "Fogged" es participio. En inglés, muchos sustantivos de clima se convierten en adjetivos añadiendo -y. ¿Cuál opción sigue ese patrón?'}, {es:'¿Cuál es la temperatura?',en:'What\'s the ___?',blank:'temperature',opts:['temperature','grade','degree'],ans:0,tip:'"Grade" y "degree" se parecen, pero solo uno es el sustantivo inglés para "temperatura" en general. ¿Cuál?'}, ]}, {id:15, name:'Direcciones', sub:'Getting around', boss:false, xp:100, qs:[ {es:'Gira a la izquierda.',en:'Turn ___.',blank:'left',opts:['left','right','straight'],ans:0,tip:'Right = derecha, straight = recto. Para girar hacia el lado contrario al corazón, ¿cuál dirección es?'}, {es:'Sigue todo recto.',en:'Go ___ ahead.',blank:'straight',opts:['straight','right','left'],ans:0,tip:'Left y right son giros. Para avanzar sin doblar en ninguna dirección, ¿cuál opción usamos?'}, {es:'¿Dónde queda la estación?',en:'Where is the ___?',blank:'station',opts:['station','stop','subway'],ans:0,tip:'Stop = parada de bus. Subway = metro (medio de transporte). El edificio donde están los trenes/metro se llama... ¿cuál?'}, {es:'Está a dos manzanas.',en:"It's two ___ away.",blank:'blocks',opts:['blocks','streets','roads'],ans:0,tip:'Streets = calles (no distancia). Roads = caminos/carreteras. Para medir distancia en ciudad con "cuántas cuadras", ¿cuál palabra usamos?'}, {es:'Está a la derecha del banco.',en:"It's to the ___ of the bank.",blank:'right',opts:['right','left','front'],ans:0,tip:'Left = izquierda, front = frente. Si el banco está al costado opuesto a la izquierda, ¿cuál preposición de dirección usamos?'}, ]}, {id:'3b', name:'JEFE — Mundo 3', sub:'Narra tu día completo', boss:true, xp:500, qs:[ {es:"Empiezas el día diciéndole al mundo:",en:"I wake ___ at 7 and take a shower.",blank:"up",opts:["up","on","is"],ans:0,tip:"<strong>Wake up</strong> + <strong>take a shower</strong>. Dos phrasal verbs clave."}, {es:"Desayunas y vas al trabajo.",en:"I have ___ and go to work by subway.",blank:"breakfast",opts:["breakfast","lunch","is"],ans:0,tip:"<strong>Breakfast</strong> = desayuno. By subway = en metro."}, {es:"Explicas el tiempo que hace hoy.",en:"It's ___ and hot.",blank:"sunny",opts:["sunny","rain","foggy"],ans:0,tip:"Adjetivos de tiempo: <strong>sunny</strong> (soleado) + <strong>hot</strong> (caluroso)."}, {es:"Explicas dónde vives.",en:"I live ___ blocks from the station.",blank:"two",opts:["two","to","is"],ans:0,tip:"<strong>Two blocks from the station</strong> = a dos manzanas de la estación."}, {es:'Terminas el día.',en:'I go to ___ at eleven.',blank:'bed',opts:['bed','sleep','rest'],ans:0,tip:'<strong>Go to bed</strong> = acostarse. La frase más común para terminar el día.'}, ]}, ] }, { id:4, name:'Core Grammar', icon:'🧠', color:'#f59e0b', desc:'La gramática que todo lo sostiene', levels:[ {id:16, name:'Present Simple', sub:'Hábitos y rutinas', boss:false, xp:100, qs:[ {es:'Ella trabaja en un hospital.',en:'She ___ in a hospital.',blank:'works',opts:['work','works','working'],ans:1,tip:'Con I/we/you/they el verbo no cambia. Pero con she/he/it... ¿cuál opción tiene la marca de tercera persona singular?'}, {es:'Los trenes salen a tiempo.',en:'Trains ___ on time.',blank:'leave',opts:['leave','leaves','leaving'],ans:0,tip:'Trains es plural (= they). Con they, el verbo no lleva -s. ¿Cuál opción es el verbo sin modificar?'}, {es:'¿Dónde vives?',en:'Where do you ___?',blank:'live',opts:['live','lives','living'],ans:0,tip:'Cuando usamos do/does en la pregunta, el verbo principal queda en su forma básica. ¿Cuál es "vivir" sin modificar?'}, {es:'El sol sale por el este.',en:'The sun ___ in the east.',blank:'rises',opts:['rise','rises','rising'],ans:1,tip:'The sun puede reemplazarse por "it" (singular). Con he/she/it, el verbo lleva -s en presente. ¿Cuál opción tiene esa -s?'}, {es:'No como carne.',en:"I ___ eat meat.",blank:"don't",opts:["don't","doesn't","not"],ans:0,tip:'I/You/We/They + <strong>don\'t</strong> para negativo.'}, ]}, {id:17, name:'Do / Does', sub:'Preguntas y negaciones', boss:false, xp:100, qs:[ {es:'¿Habla él alemán?',en:'___ he speak German?',blank:'Does',opts:['Do','Does','Is'],ans:1,tip:'Hay dos auxiliares: Do y Does. Does se usa para el grupo de he/she/it. He es parte de ese grupo. ¿Cuál auxiliar le toca?'}, {es:'Ella no tiene carro.',en:"She ___ have a car.",blank:"doesn't",opts:["don't","doesn't","isn't"],ans:1,tip:'She → <strong>doesn\'t</strong>. Después del auxiliar el verbo va en base.'}, {es:'¿A qué hora empieza la clase?',en:'What time ___ the class start?',blank:'does',opts:['do','does','is'],ans:1,tip:'The class = it (singular). Do se usa para I/you/we/they, Does para he/she/it. ¿Cuál va con "the class"?'}, {es:'No entiendo la pregunta.',en:"I ___ understand the question.",blank:"don't",opts:["don't","doesn't","am not"],ans:0,tip:'I → <strong>don\'t</strong>. I don\'t understand.'}, {es:'¿Te gusta el rock?',en:'___ you like rock?',blank:'Do',opts:['Do','Does','Are'],ans:0,tip:'Does se usa con he/she/it. Are es to be. Para preguntar con you como sujeto, ¿cuál auxiliar encaja?'}, ]}, {id:18, name:'Preguntas', sub:'Wh- questions', boss:false, xp:100, qs:[ {es:'¿Qué hora es?',en:'___ time is it?',blank:'What',opts:['What','Which','How'],ans:0,tip:'"Which time" suena extraño. "How time" tampoco. Para preguntar la hora en inglés, ¿cuál palabra interrogativa se usa?'}, {es:'¿Por qué llegaste tarde?',en:'___ were you late?',blank:'Why',opts:['Why','What','When'],ans:0,tip:'What pregunta qué. When pregunta cuándo. Para preguntar la razón o causa de algo, ¿cuál de las tres usamos?'}, {es:'¿Cuándo sale el tren?',en:'___ does the train leave?',blank:'When',opts:['When','Where','What'],ans:0,tip:'Where pregunta lugar. What pregunta qué. Para preguntar en qué momento sale el tren, ¿cuál interrogativo usas?'}, {es:'¿Cómo se llama ella?',en:'___ is her name?',blank:'What',opts:['What','How','Which'],ans:0,tip:'"How" pregunta manera o estado. "Which" elige entre opciones. Para preguntar cuál es el nombre de alguien, ¿cuál usamos?'}, {es:'¿Quién rompió el vaso?',en:'___ broke the glass?',blank:'Who',opts:['Who','What','Which'],ans:0,tip:'What pregunta cosas. Which elige entre opciones. Para preguntar qué persona rompió el vaso, ¿cuál interrogativo usamos?'}, ]}, {id:19, name:'Negaciones', sub:'No, not, never...', boss:false, xp:100, qs:[ {es:'Nunca como comida picante.',en:'I ___ eat spicy food.',blank:'never',opts:['never','not','no'],ans:0,tip:'"I not eat" es incorrecto. "Never" ya es negativo por sí solo, así que el verbo va en positivo. ¿Cuál opción significa "nunca"?'}, {es:'No hay nadie aquí.',en:"There ___ anyone here.",blank:"isn't",opts:["isn't","aren't","is no"],ans:0,tip:'There isn\'t + singular. There aren\'t + plural.'}, {es:'Ella no está en casa.',en:"She ___ at home.",blank:"isn't",opts:["don't","isn't","not"],ans:1,tip:'To be negativo: <strong>isn\'t</strong> (is not).'}, {es:'No tengo dinero.',en:"I ___ have money.",blank:"don't",opts:["don't","no","am not"],ans:0,tip:'Have → auxiliar do: <strong>I don\'t have</strong>.'}, {es:'Él tampoco quiere venir.',en:"He doesn't want to come ___.",blank:'either',opts:['either','too','also'],ans:0,tip:'"Too" y "also" se usan en frases positivas (yo también). Para frases negativas (yo tampoco), ¿cuál de las tres opciones funciona?'}, ]}, {id:20, name:'Adverbios', sub:'Always, often, never...', boss:false, xp:100, qs:[ {es:'Siempre llego puntual.',en:'I ___ arrive on time.',blank:'always',opts:['always','never','sometimes'],ans:0,tip:'Never = nunca, sometimes = a veces. ¿Cuál opción significa "en todos los casos, sin excepción"?'}, {es:'Él a veces llega tarde.',en:'He ___ arrives late.',blank:'sometimes',opts:['sometimes','always','rarely'],ans:0,tip:'Always = siempre (100%), rarely = casi nunca. Para "de vez en cuando, no siempre", ¿cuál opción encaja?'}, {es:'Casi nunca como dulces.',en:'I ___ eat sweets.',blank:'rarely',opts:['rarely','usually','often'],ans:0,tip:'Usually = normalmente (frecuente). Often = con frecuencia. ¿Cuál opción significa la frecuencia más baja, casi nunca?'}, {es:'Ella normalmente trabaja desde casa.',en:'She ___ works from home.',blank:'usually',opts:['usually','sometimes','ever'],ans:0,tip:'Sometimes = a veces. Ever = alguna vez (en preguntas). ¿Cuál opción indica algo que pasa la mayoría del tiempo pero no siempre?'}, {es:'¿Has estado alguna vez en Japón?',en:'Have you ___ been to Japan?',blank:'ever',opts:['ever','never','always'],ans:0,tip:'Never = nunca (negativo). Always = siempre. En una pregunta sobre experiencias pasadas, ¿cuál palabra pregunta "¿en algún momento de tu vida...?"?'}, ]}, {id:'4b', name:'JEFE — Mundo 4', sub:'Detecta los errores', boss:true, xp:500, qs:[ {es:'¿Cuál es CORRECTA?',en:'A: She don\'t like coffee. B: She doesn\'t like coffee.',blank:'B',opts:['A es correcta','B es correcta','Ambas son iguales'],ans:1,tip:'She → <strong>doesn\'t</strong>. "Don\'t" es para I/You/We/They.'}, {es:'¿Cuál es CORRECTA?',en:'A: I never eat not meat. B: I never eat meat.',blank:'B',opts:['A es correcta','B es correcta','Ambas están mal'],ans:1,tip:'Con <strong>never</strong> (negativo) no se añade "not". Doble negativo = error.'}, {es:'¿Cuál es CORRECTA?',en:'A: What time does he arrives? B: What time does he arrive?',blank:'B',opts:['A es correcta','B es correcta','Ambas están bien'],ans:1,tip:'Con does, el verbo va en base: <strong>arrive</strong> sin -s.'}, {es:'¿Cuál es CORRECTA?',en:'A: She works always late. B: She always works late.',blank:'B',opts:['A es correcta','B es correcta','Las dos liston'],ans:1,tip:'Los adverbios de frecuencia van <strong>antes del verbo principal</strong>.'}, {es:'¿Cuál es CORRECTA?',en:'A: Do you ever been to Paris? B: Have you ever been to Paris?',blank:'B',opts:['A es correcta','B es correcta','Depende del contexto'],ans:1,tip:'<strong>Have you ever been</strong> = ¿Has estado alguna vez? Presente perfecto.'}, ]}, ] }, { id:5, name:'Speak Naturally', icon:'🔥', color:'#ef4444', desc:'Suena como un nativo', levels:[ {id:21, name:'Contracciones', sub:'I\'m, you\'re, it\'s...', boss:false, xp:100, qs:[ {es:'No lo sé.',en:'___ know.',blank:"I don't",opts:["I don't","I not","I no"],ans:0,tip:'<strong>I don\'t</strong> = I do not. Contracción estándar.'}, {es:'Él es mi amigo.',en:'___ my friend.',blank:"He's",opts:["He's","He is a","His"],ans:0,tip:'<strong>He\'s</strong> = He is. Contracción del verbo to be.'}, {es:'No estamos listos.',en:'___ ready.',blank:"We're not",opts:["We're not","We not","We aren't ready"],ans:0,validAns:[0,2],tip:'<strong>We\'re not</strong> o We aren\'t. Ambas son correctas, esta es más fluida.'}, {es:'¿No es increíble?',en:"___ amazing?",blank:"Isn't it",opts:["Isn't it","Is it not","Not is it"],ans:0,tip:'<strong>Isn\'t it?</strong> = ¿No es...? Tag question muy común.'}, {es:'Ellos no han llegado.',en:"___ arrived yet.",blank:"They haven't",opts:["They haven't","They not have","They has not"],ans:0,tip:'<strong>They haven\'t</strong> = They have not. Presente perfecto negativo.'}, ]}, {id:22, name:'Frases comunes', sub:'Expresiones del día a día', boss:false, xp:100, qs:[ {es:'Lo que quieras.',en:'___ you want.',blank:'Whatever',opts:['Whatever','However','Whenever'],ans:0,tip:'<strong>Whatever</strong> = lo que sea/quieras. Expresa indiferencia.'}, {es:'¡Por supuesto!',en:'Of ___ !',blank:'course',opts:['course','sure','reason'],ans:0,tip:'<strong>Of course!</strong> = ¡Por supuesto! Muy común y natural.'}, {es:'Más o menos.',en:'More or ___.',blank:'less',opts:['less','fewer','little'],ans:0,tip:'<strong>More or less</strong> = más o menos. Expresión fija.'}, {es:'¡Qué va!',en:'No ___!',blank:'way',opts:['way','chance','option'],ans:0,tip:'<strong>No way!</strong> = ¡Qué va! / ¡Imposible! Muy expresivo.'}, {es:'Al final resultó bien.',en:'It worked ___ in the end.',blank:'out',opts:['out','up','on'],ans:0,tip:'<strong>Work out</strong> = resultar, salir bien. "In the end" = al final.'}, ]}, {id:23, name:'Small Talk', sub:'El arte de la charla', boss:false, xp:100, qs:[ {es:'¿Has visto alguna serie buena?',en:'Have you ___ any good shows lately?',blank:'watched',opts:['watched','been watching','saw'],ans:0,tip:'<strong>Have you watched</strong> = ¿Has visto? Presente perfecto.'}, {es:'Yo también lo creo.',en:'I ___ so too.',blank:'think',opts:['think','thought','am thinking'],ans:0,tip:'<strong>I think so</strong> = yo también lo creo / creo que sí.'}, {es:'Suena bien.',en:'That ___ good.',blank:'sounds',opts:['sounds','hears','listens'],ans:0,tip:'<strong>Sounds good!</strong> = Suena bien. Muy común para aceptar planes.'}, {es:'¿Qué planes tienes para el finde?',en:'What are your ___ for the weekend?',blank:'plans',opts:['plans','plannings','thoughts'],ans:0,tip:'<strong>Plans for the weekend</strong> = planes para el fin de semana.'}, {es:'Mejor la próxima vez.',en:'Better ___ next time.',blank:'luck',opts:['luck','chance','try'],ans:0,tip:'<strong>Better luck next time</strong> = mejor la próxima vez.'}, ]}, {id:24, name:'Opiniones', sub:'Expresar lo que piensas', boss:false, xp:100, qs:[ {es:'En mi opinión, es demasiado caro.',en:'In my ___, it\'s too expensive.',blank:'opinion',opts:['opinion','view','both work'],ans:2,validAns:[0,1,2],tip:'<strong>In my opinion</strong> e <strong>in my view</strong> son intercambiables.'}, {es:'Creo que tienes razón.',en:'I ___ you\'re right.',blank:'think',opts:['think','feel','believe'],ans:0,validAns:[0,1,2],tip:'<strong>I think/feel/believe</strong> + that. Las tres sirven para opinar.'}, {es:'Personalmente, prefiero el café.',en:'___, I prefer coffee.',blank:'Personally',opts:['Personally','For me','Both work'],ans:2,validAns:[0,1,2],tip:'<strong>Personally</strong> y <strong>for me</strong> ambos funcionan para opinar.'}, {es:'Desde mi punto de vista, es un error.',en:'From my point of ___, it\'s a mistake.',blank:'view',opts:['view','sight','perspective'],ans:2,tip:'<strong>Point of view</strong> y <strong>perspective</strong> son correctos. "Sight" no encaja aquí.'}, {es:'¿Qué opinas?',en:'What do you ___?',blank:'think',opts:['think','opinion','feel'],ans:0,validAns:[0,2],tip:'<strong>What do you think/feel?</strong> Ambas preguntan la opinión.'}, ]}, {id:25, name:'Reaccionar', sub:'Respuestas naturales', boss:false, xp:100, qs:[ {es:'Alguien dice algo sorprendente. Reaccionas:',en:'___ !',blank:'Really!',opts:['Really!','Truly!','Exactly!'],ans:0,tip:'<strong>Really!</strong> = ¿En serio? Reacción universal a algo sorprendente.'}, {es:'Te dicen algo triste. Dices:',en:'I\'m so ___ to hear that.',blank:'sorry',opts:['sorry','sad','bad'],ans:0,tip:'<strong>I\'m so sorry to hear that</strong> = lo siento mucho. Empatía.'}, {es:'Algo es increíble. Dices:',en:'That\'s ___!',blank:'amazing',opts:['amazing','wonderly','greatful'],ans:0,tip:'<strong>That\'s amazing!</strong> = ¡Es increíble! Natural y muy usado.'}, {es:'Alguien te da las gracias.',en:'You\'re ___!',blank:'welcome',opts:['welcome','wellcome','welcomed'],ans:0,tip:'<strong>You\'re welcome</strong> = de nada. Respuesta a "thank you".'}, {es:'Algo es exactamente lo que pensabas.',en:'I knew ___!',blank:'it',opts:['it','so','that'],ans:1,tip:'<strong>I knew it!</strong> = ¡Lo sabía! "I knew so" no es natural.'}, ]}, {id:'5b', name:'JEFE — Mundo 5', sub:'Conversación real', boss:true, xp:500, qs:[ {es:'Alguien te pregunta: "What do you think of the movie?"',en:'___, I loved it!',blank:'Personally',opts:['Personally','For me','Both work'],ans:2,validAns:[0,1,2],tip:'<strong>Personally</strong> / <strong>For me</strong>. Ambas introducen opinión correctamente.'}, {es:'Te cuentan que ganaron un premio. Reaccionas:',en:'___ ! You deserved it!',blank:'Amazing',opts:['Amazing!','Sorry!','Whatever!'],ans:0,tip:'<strong>Amazing!</strong> = reacción positiva entusiasta.'}, {es:'Proponen quedar el sábado. Aceptas.',en:'___ ! See you then.',blank:'Sounds great',opts:['Sounds great','No way','Of course not'],ans:0,tip:'<strong>Sounds great!</strong> = ¡Genial! Aceptar un plan de forma natural.'}, {es:'Te dicen algo inesperado.',en:'___ ? I had no idea!',blank:'Really',opts:['Really','Truly','Surely'],ans:0,tip:'<strong>Really?</strong> = ¿En serio? Reacción de sorpresa estándar.'}, {es:'Te despides de alguien que acabas de conocer.',en:'It was ___ meeting you!',blank:'great',opts:['great','good','nice'],ans:0,validAns:[0,1,2],tip:'<strong>Great</strong> y <strong>nice</strong> ambos funcionan: "It was great/nice meeting you!"'}, ]}, ] }, { id:6, name:'Useful English', icon:'💼', color:'#8b5cf6', desc:'Inglés para la vida real', levels:[ {id:26, name:'Trabajo', sub:'Work & office', boss:false, xp:100, qs:[ {es:'Tengo una reunión a las tres.',en:'I have a ___ at three.',blank:'meeting',opts:['meeting','meet','reunion'],ans:0,tip:'"Meet" es el verbo. "Reunion" en inglés es un reencuentro especial (ej: de la escuela). Para una reunión de trabajo normal, ¿cuál sustantivo usamos?'}, {es:'¿Puedes enviarme el informe?',en:'Can you ___ me the report?',blank:'send',opts:['send','give','take'],ans:0,tip:'Give = dar físicamente. Take = llevar. Para transmitir algo por correo o digitalmente, ¿cuál verbo se usa?'}, {es:'Trabajo a tiempo completo.',en:'I work ___.',blank:'full-time',opts:['full-time','complete-time','full time'],ans:0,validAns:[0,2],tip:'<strong>Full-time</strong> (con guión) o <strong>full time</strong>. Ambas se usan.'}, {es:'Mi jefe está de vacaciones.',en:'My boss is on ___.',blank:'vacation',opts:['vacation','holidays','both work'],ans:2,validAns:[0,1,2],tip:'<strong>Vacation</strong> (US) y <strong>holidays</strong> (UK) son intercambiables.'}, {es:'Solicité un aumento de sueldo.',en:'I asked for a ___ ___.',blank:'pay raise',opts:['pay raise','salary up','money more'],ans:0,tip:'<strong>Pay raise</strong> (US) = aumento de sueldo. UK: pay rise.'}, ]}, {id:27, name:'Emails', sub:'Writing professionally', boss:false, xp:100, qs:[ {es:'Estimado señor García:',en:'___ Mr. García,',blank:'Dear',opts:['Dear','Dear Mr','To'],ans:0,tip:'"Dear Mr." tiene artículo doble. "To Mr." es más frío y antiguo. En cartas y emails formales, ¿cuál palabra de saludo es la más estándar?'}, {es:'Me pongo en contacto con usted para...',en:'I am ___ to you regarding...',blank:'writing',opts:['writing','contacting','reaching'],ans:2,tip:'<strong>Writing</strong> y <strong>reaching</strong> out son correctos en emails formales.'}, {es:'Adjunto encontrará el documento.',en:'Please find the document ___.',blank:'attached',opts:['attached','adjunto','below'],ans:0,tip:'<strong>Please find attached</strong> = adjunto encontrará. Frase de email clásica.'}, {es:'En espera de su respuesta.',en:'I look ___ to hearing from you.',blank:'forward',opts:['forward','ahead','to'],ans:0,tip:'<strong>Look forward to</strong> = esperar con interés. Cierre de email formal.'}, {es:'Un saludo,',en:'___ regards,',blank:'Kind',opts:['Kind','Best','Both work'],ans:2,validAns:[0,1,2],tip:'<strong>Kind regards</strong> y <strong>Best regards</strong> son los cierres más comunes.'}, ]}, {id:28, name:'Entrevistas', sub:'Job interviews', boss:false, xp:100, qs:[ {es:'¿Puede hablarme de usted?',en:'Can you ___ me about yourself?',blank:'tell',opts:['tell','talk','say'],ans:0,tip:'<strong>Tell me about yourself</strong> = cuénteme sobre usted. Pregunta clásica.'}, {es:'Tengo cinco años de experiencia.',en:'I have five years of ___.',blank:'experience',opts:['experience','experiences','work'],ans:0,tip:'<strong>Experience</strong> incontable en este sentido. No se pluraliza.'}, {es:'Soy una persona trabajadora.',en:'I am a ___ person.',blank:'hard-working',opts:['hard-working','hardly working','work-hard'],ans:0,tip:'<strong>Hard-working</strong> = trabajador/a. "Hardly working" = apenas trabajando.'}, {es:'¿Cuáles son sus puntos fuertes?',en:'What are your ___?',blank:'strengths',opts:['strengths','strongness','strenghts'],ans:0,tip:'<strong>Strengths</strong> (sin h antes de t). Weaknesses = debilidades.'}, {es:'¿Por qué quiere este trabajo?',en:'Why do you ___ this job?',blank:'want',opts:['want','apply','desire'],ans:0,tip:'<strong>Why do you want this job?</strong> Responde con motivación, no con salario.'}, ]}, {id:29, name:'Explicar ideas', sub:'Presentations & clarity', boss:false, xp:100, qs:[ {es:'En primer lugar...',en:'___ of all...',blank:'First',opts:['First','Firstly','Both work'],ans:2,validAns:[0,1,2],tip:'<strong>First of all</strong> y <strong>Firstly</strong> ambos funcionan para empezar.'}, {es:'Por otro lado...',en:'On the other ___...',blank:'hand',opts:['hand','side','part'],ans:0,tip:'<strong>On the other hand</strong> = por otro lado. Expresión fija.'}, {es:'Como resultado...',en:'___ a result...',blank:'As',opts:['As','For','Like'],ans:0,tip:'<strong>As a result</strong> = como resultado. "For a result" no existe.'}, {es:'En conclusión...',en:'___ conclusion...',blank:'In',opts:['In','For','To'],ans:0,tip:'<strong>In conclusion</strong> = en conclusión. Frase fija de cierre.'}, {es:'Es decir...',en:'___ is to say...',blank:'That',opts:['That','This','It'],ans:0,tip:'<strong>That is to say</strong> = es decir. Equilistonte a "i.e." en inglés.'}, ]}, {id:30, name:'Convencer', sub:'Persuasión en inglés', boss:false, xp:100, qs:[ {es:'Consideremos las opciones.',en:"Let's consider our ___.",blank:'options',opts:['options','choices','both work'],ans:2,validAns:[0,1,2],tip:'<strong>Options</strong> y <strong>choices</strong> son sinónimos aquí.'}, {es:'Los datos muestran claramente que...',en:'The data clearly ___ that...',blank:'shows',opts:['shows','tell','show'],ans:0,tip:'Data → en inglés formal es singular: <strong>shows</strong> (aunque se debate).'}, {es:'Estarás de acuerdo en que...',en:"You'll ___ that...",blank:'agree',opts:['agree','agreed','agreeing'],ans:0,tip:'<strong>You\'ll agree that</strong> = estarás de acuerdo en que. Fórmula persuasiva.'}, {es:'La evidencia habla por sí sola.',en:'The evidence speaks for ___.',blank:'itself',opts:['itself','himself','themselves'],ans:0,tip:'Evidence = singular, neutro → <strong>itself</strong>.'}, {es:'¿No crees que...?',en:"Don't you ___ that...?",blank:'think',opts:['think','thought','agree'],ans:0,tip:'<strong>Don\'t you think that...?</strong> Pregunta retórica para persuadir.'}, ]}, {id:'6b', name:'JEFE — Mundo 6', sub:'Mini simulación profesional', boss:true, xp:500, qs:[ {es:"Empiezas un email formal.",en:"___ Mr. Smith, I am writing to you regarding...",blank:"Dear",opts:["Dear","Hello","To"],ans:0,tip:"<strong>Dear</strong> + <strong>writing</strong>. Apertura formal estándar."}, {es:"Presentas tu experiencia.",en:"I have ___ years of experience in marketing.",blank:"five",opts:["five","three","is"],ans:0,tip:"Experience = incontable. <strong>Years of experience</strong>."}, {es:"Ordenas tus ideas.",en:"___ of all, our data shows growth. On the other hand, costs increased.",blank:"First",opts:["First","Firstly","is"],ans:0,tip:"<strong>First of all... On the other hand</strong>. Conectores de presentación."}, {es:"Intentas convencer.",en:"Don't you ___ that this is our best option?",blank:"think",opts:["think","agree","is"],ans:0,tip:"<strong>Think/agree</strong> + <strong>option/choice</strong>. Todas las combinaciones funcionan."}, {es:"Cierras el email.",en:"I look ___ to hearing from you. Kind regards.",blank:"forward",opts:["forward","ahead","is"],ans:0,tip:"<strong>Look forward to</strong> + <strong>Kind/Best regards</strong>. Ambos cierres son correctos."}, ]}, ] }, { id:7, name:'English Mastery', icon:'🎮', color:'#ec4899', desc:'El nivel donde todo fluye', levels:[ {id:31, name:'Series & cultura', sub:'English as spoken on screen', boss:false, xp:100, qs:[ {es:'"¿Estás de broma?" (informal)',en:'You\'ve ___ to be kidding me!',blank:'got',opts:['got','get','have'],ans:0,tip:'<strong>You\'ve got to be kidding me!</strong> = ¿Estás de broma? Muy coloquial.'}, {es:'"No es para tanto."',en:'It\'s not a big ___.',blank:'deal',opts:['deal','thing','issue'],ans:0,tip:'<strong>It\'s not a big deal</strong> = no es para tanto. Expresión muy común.'}, {es:'"Sigue así."',en:'Keep ___ the good work!',blank:'up',opts:['up','on','going'],ans:0,tip:'<strong>Keep up the good work!</strong> = ¡Sigue así! / ¡Buen trabajo!'}, {es:'"Me alegra saberlo."',en:'Glad to ___ it.',blank:'hear',opts:['hear','know','see'],ans:0,tip:'<strong>Glad to hear it</strong> = me alegra saberlo. Natural y cotidiano.'}, {es:'"Lo que sea necesario."',en:'Whatever it ___.',blank:'takes',opts:['takes','needs','wants'],ans:0,tip:'<strong>Whatever it takes</strong> = lo que sea necesario. Expresión de determinación.'}, ]}, {id:32, name:'Humor', sub:'Wordplay & sarcasm', boss:false, xp:100, qs:[ {es:'¿Cuándo un chiste es un "pun"?',en:'A pun is a joke that plays on ___ meanings.',blank:'double',opts:['double','two','multiple'],ans:0,tip:'Un <strong>pun</strong> juega con el <strong>double meaning</strong> (doble sentido) de palabras.'}, {es:'"Qué ironía." (sarcasmo)',en:'Oh, ___. Just what I needed.',blank:'great',opts:['great','bad','terrible'],ans:0,tip:'<strong>Oh, great.</strong> (tono plano) = sarcasmo. En contexto, significa lo contrario.'}, {es:'"¿Lo pillo?" (¿entiendes el chiste?)',en:'Do you ___ it?',blank:'get',opts:['get','take','catch'],ans:0,tip:'<strong>Get a joke</strong> = entender/pillar un chiste.'}, {es:'"Me hizo mucha gracia."',en:'That ___ me up.',blank:'cracked',opts:['cracked','broke','split'],ans:0,tip:'<strong>That cracked me up!</strong> = ¡Me partí de risa! Muy coloquial.'}, {es:'"En serio, sin bromas."',en:'Seriously, no ___.',blank:'kidding',opts:['kidding','joking','both work'],ans:2,validAns:[0,1,2],tip:'<strong>No kidding</strong> y <strong>no joking</strong> ambos significan "en serio, sin bromas".'}, ]}, {id:33, name:'Doble sentido', sub:'Idioms & phrasal verbs', boss:false, xp:100, qs:[ {es:'"Estoy en un aprieto."',en:'I\'m in a ___ spot.',blank:'tight',opts:['tight','hard','bad'],ans:0,tip:'<strong>In a tight spot</strong> = en un aprieto/situación difícil. Idiom fijo.'}, {es:'"Dar en el clavo."',en:'To hit the ___ on the head.',blank:'nail',opts:['nail','point','target'],ans:0,tip:'<strong>Hit the nail on the head</strong> = dar en el clavo. Exactamente correcto.'}, {es:'"Costar un ojo de la cara."',en:'To cost an arm and a ___.',blank:'leg',opts:['leg','hand','foot'],ans:0,tip:'<strong>Cost an arm and a leg</strong> = ser carísimo. Equilisto a "costar un ojo".'}, {es:'"Matar dos pájaros de un tiro."',en:'To kill two ___ with one stone.',blank:'birds',opts:['birds','flies','problems'],ans:0,tip:'<strong>Kill two birds with one stone</strong>. Idiom de origen latino.'}, {es:'"Romper el hielo."',en:'To ___ the ice.',blank:'break',opts:['break','melt','cut'],ans:0,tip:'<strong>Break the ice</strong> = romper el hielo. Idéntico al español.'}, ]}, {id:34, name:'Fluidez', sub:'Natural rhythm & flow', boss:false, xp:100, qs:[ {es:'¿Cuál suena más natural?',en:'A: I am going to the gym. B: I\'m going to the gym.',blank:'B',opts:['A (más formal)','B (más natural)','Son idénticas'],ans:1,tip:'<strong>B es más natural</strong>. Las contracciones hacen el inglés más fluido.'}, {es:'¿Cuál es el orden correcto?',en:'A: Everyday I drink coffee. B: I drink coffee every day.',blank:'B',opts:['A es correcta','B es correcta','Ambas liston'],ans:1,tip:'<strong>Every day</strong> (dos palabras) al final o inicio de frase. "Everyday" = adjetivo (everyday life).'}, {es:'"Going to" informal:',en:'I\'m gonna ___ the store.',blank:'go to',opts:['go to','go','going'],ans:0,tip:'<strong>Gonna</strong> = going to. Informal hablado. "Gonna go to the store."'}, {es:'"Want to" informal:',en:'Do you ___ come?',blank:'wanna',opts:['wanna','gonna','gotta'],ans:0,tip:'<strong>Wanna</strong> = want to. Gotta = have got to. Gonna = going to.'}, {es:'"Have got to" informal:',en:'I ___ leave now.',blank:'gotta',opts:['gotta','wanna','gonna'],ans:0,tip:'<strong>Gotta</strong> = have got to = tengo que. "I gotta go" = me tengo que ir.'}, ]}, {id:35, name:'Pensar en inglés', sub:'El nivel final', boss:false, xp:100, qs:[ {es:"Sin traducir: ¿qué significa \"on the go\"?",en:"\"I eat on the go\" means I eat...",blank:"while busy",opts:["while busy","while sitting","very quickly"],ans:0,tip:"<strong>On the go</strong> = mientras haces otras cosas, sin parar. \"I'm always on the go.\""}, {es:'Piensa en inglés: ¿cómo dices "te lo dije"?',en:'___ so.',blank:'I told you',opts:['I said you','I told you','I told to you'],ans:1,tip:'<strong>I told you so!</strong> = ¡Te lo dije! "Said" no va con objetos indirectos sin "to".'}, {es:"Sin diccionario: ¿qué es \"a no-brainer\"?",en:"A no-brainer is something...",blank:"obvious",opts:["obvious","impossible","very technical"],ans:0,tip:"<strong>No-brainer</strong> = algo tan obvio que no requiere pensar. \"It's a no-brainer.\""}, {es:'Instinto: ¿cuál es más natural?',en:'A: It depends of you. B: It depends on you.',blank:'B',opts:['A','B','Both'],ans:1,tip:'<strong>Depend on</strong>. En inglés es "on", nunca "of". Fallo muy común.'}, {es:'Último reto: ¿cómo terminas esta frase? "I\'d rather..."',en:'I\'d rather ___ at home tonight.',blank:'stay',opts:['stay','staying','to stay'],ans:0,tip:'<strong>Would rather + infinitivo base</strong> (sin to). I\'d rather stay, go, eat...'}, ]}, {id:'7b', name:'JEFE FINAL', sub:'Conversación libre — ¡el nivel definitivo!', boss:true, xp:500, qs:[ {es:"Eres en una entrevista. Te preguntan: \"Tell me about yourself.\"",en:"___ years of experience, I work in marketing and I love challenges.",blank:"With",opts:["With","For","Having"],ans:0,tip:"<strong>With X years of experience, I work in... and I love...</strong> Estructura natural."}, {es:"Tu colega dice que el proyecto es imposible. Persuades.",en:"Don't you ___ that with the right approach, we can make it work?",blank:"think",opts:["think","agree","is"],ans:0,tip:"<strong>Think/agree</strong> + <strong>approach/plan</strong>. Ambas son correctas y persuasivas."}, {es:"Explicas un problema de forma clara.",en:"___ of all, the issue is X. On the other hand, we have solutions.",blank:"First",opts:["First","Firstly","is"],ans:0,tip:"<strong>First of all / Firstly</strong> + <strong>On the other hand</strong>. Ambas son correctas."}, {es:"Tu jefe hace un buen trabajo. Lo felicitas.",en:"___ the good work! That truly matters.",blank:"Keep up",opts:["Keep up","Keep on","is"],ans:0,tip:"<strong>Keep up the good work</strong> + <strong>matters/counts</strong>. Ambas combinaciones son correctas."}, {es:"Terminas la conversación con fluidez.",en:"It's been ___ talking with you. See you around!",blank:"great",opts:["great","good","is"],ans:0,tip:"<strong>Great/good talking with you</strong> + <strong>around/later/soon</strong>. Todas funcionan."}, ]}, ] }, ]; const WORLD_EXTENSION_LEVELS = { 1: [ {id:'1x6', name:'Negatives with To Be', sub:'am not / isn’t / aren’t', qs:[ {es:'Yo no estoy cansado.',en:'I ___ tired.',blank:'am not',opts:['am not','is not','are not'],ans:0,tip:'Para she usamos "isn\'t", para they usamos "aren\'t"... ¿y para I? Solo hay una forma posible del to be con I.'}, {es:'Ella no está en casa.',en:'She ___ at home.',blank:'isn’t',opts:['aren’t','isn’t','am not'],ans:1,tip:'She → <strong>isn’t</strong>.'}, {es:'Ellos no son nuevos.',en:'They ___ new.',blank:'aren’t',opts:['isn’t','aren’t','am not'],ans:1,tip:'They → <strong>aren’t</strong>.'}, {es:'No es una manzana.',en:'It ___ an apple.',blank:'isn’t',opts:['isn’t','aren’t','am not'],ans:0,tip:'It → <strong>isn’t</strong>.'}, {es:'Tú no estás solo.',en:'You ___ alone.',blank:'aren’t',opts:['isn’t','aren’t','am not'],ans:1,tip:'You → <strong>aren’t</strong>.'}, ]}, {id:'1x7', name:'Questions with To Be', sub:'Am / Is / Are questions', qs:[ {es:'¿Eres estudiante?',en:'___ you a student?',blank:'Are',opts:['Am','Is','Are'],ans:2,tip:'Am I...? Is he/she/it...? ¿Qué forma de to be le toca a you normalmente? La pregunta invierte sujeto y verbo.'}, {es:'¿Está ella lista?',en:'___ she ready?',blank:'Is',opts:['Is','Are','Am'],ans:0,tip:'Are you...? Am I...? She va con la forma singular de to be para he/she/it. ¿Cuál es?'}, {es:'¿Llego tarde?',en:'___ I late?',blank:'Am',opts:['Am','Is','Are'],ans:0,tip:'<strong>Am I late?</strong> significa “¿Llego tarde?”, no “llego tarde”.'}, {es:'¿Son ellos amigos?',en:'___ they friends?',blank:'Are',opts:['Is','Are','Am'],ans:1,tip:'Is he/she/it? Am I? They va con el mismo grupo que we y you. ¿Cuál forma del to be les corresponde en pregunta?'}, {es:'¿Está abierto?',en:'___ it open?',blank:'Is',opts:['Are','Is','Am'],ans:1,tip:'Are we/they/you? Am I? It es singular, como he y she. Si Is she...?, entonces para it, ¿cuál usamos?'}, ]}, {id:'1x8', name:'This / That / These / Those', sub:'Señalar cosas', qs:[ {es:'Este libro es nuevo.',en:'___ book is new.',blank:'This',opts:['This','These','Those'],ans:0,tip:'This = este/esta, singular y cerca.'}, {es:'Esos carros son rojos.',en:'___ cars are red.',blank:'Those',opts:['That','These','Those'],ans:2,tip:'Those = esos/esas, plural y lejos.'}, {es:'Estas llaves son mías.',en:'___ keys are mine.',blank:'These',opts:['This','These','That'],ans:1,tip:'These = estos/estas, plural y cerca.'}, {es:'Esa puerta está cerrada.',en:'___ door is closed.',blank:'That',opts:['Those','This','That'],ans:2,tip:'That = ese/esa, singular y lejos.'}, {es:'Estos son mis amigos.',en:'___ are my friends.',blank:'These',opts:['This','These','That'],ans:1,tip:'These are = estos son.'}, ]}, {id:'1x9', name:'Build Simple Sentences', sub:'Orden y sentido', qs:[ {es:'Ella está estudiando inglés.',en:'She is ___ English.',blank:'studying',opts:['study','studying','studies'],ans:1,tip:'Present continuous: is + verbo-ing.'}, {es:'Somos buenos amigos.',en:'We are good ___.',blank:'friends',opts:['friend','friends','friendly'],ans:1,tip:'We = plural → friends.'}, {es:'Tengo un paraguas.',en:'I have ___ umbrella.',blank:'an',opts:['a','an','the'],ans:1,tip:'Umbrella empieza con sonido vocal → an.'}, {es:'Ese niño está corriendo.',en:'That child is ___.',blank:'running',opts:['run','running','runs'],ans:1,tip:'is + running.'}, {es:'Estas son cajas.',en:'These are ___.',blank:'boxes',opts:['box','boxs','boxes'],ans:2,tip:'Box termina en x → boxes.'}, ]} ], 2: [ {id:'2x11', name:'Polite English', sub:'please / sorry / excuse me', qs:[ {es:'Disculpa, ¿puedo pasar?',en:'___ me, can I pass?',blank:'Excuse',opts:['Sorry','Excuse','Please'],ans:1,tip:'Excuse me se usa para llamar la atención con respeto.'}, {es:'Lo siento mucho.',en:'I’m very ___.',blank:'sorry',opts:['please','sorry','fine'],ans:1,tip:'Sorry = lo siento.'}, {es:'¿Puedes ayudarme, por favor?',en:'Can you help me, ___?',blank:'please',opts:['thanks','please','sorry'],ans:1,tip:'Please suaviza la petición.'}, {es:'Gracias por tu ayuda.',en:'Thanks for your ___.',blank:'help',opts:['help','please','sorry'],ans:0,tip:'Thanks for + noun/gerund.'}, {es:'De nada.',en:'You’re ___.',blank:'welcome',opts:['good','welcome','fine'],ans:1,tip:'You’re welcome = de nada.'}, ]}, {id:'2x12', name:'Asking for Help', sub:'Can you...? Could you...?', qs:[ {es:'¿Puedes repetir?',en:'Can you ___ that?',blank:'repeat',opts:['repeat','say','speak'],ans:0,tip:'Can you repeat that? = ¿puedes repetir eso?'}, {es:'¿Podrías hablar más lento?',en:'Could you speak more ___?',blank:'slowly',opts:['slow','slowly','slower'],ans:1,tip:'Speak + adverbio: slowly.'}, {es:'No entiendo.',en:'I don’t ___.',blank:'understand',opts:['understand','know','meet'],ans:0,tip:'I don’t understand = no entiendo.'}, {es:'¿Qué significa esto?',en:'What does this ___?',blank:'mean',opts:['mean','means','meaning'],ans:0,tip:'Después de does, verbo base: mean.'}, {es:'¿Cómo se dice esto en inglés?',en:'How do you ___ this in English?',blank:'say',opts:['tell','say','speak'],ans:1,tip:'Say = decir una palabra o frase.'}, ]}, {id:'2x13', name:'Follow-up Questions', sub:'Keep the conversation alive', qs:[ {es:'¿Y tú?',en:'What about ___?',blank:'you',opts:['you','your','yours'],ans:0,tip:'What about you? = ¿y tú?'}, {es:'¿Por qué?',en:'___?',blank:'Why',opts:['Where','Why','When'],ans:1,tip:'Why pregunta razón.'}, {es:'¿Cuándo?',en:'___?',blank:'When',opts:['When','Where','Who'],ans:0,tip:'When pregunta tiempo.'}, {es:'¿Con quién?',en:'___ whom?',blank:'With',opts:['To','With','From'],ans:1,tip:'With whom? = ¿con quién?'}, {es:'Cuéntame más.',en:'Tell me ___.',blank:'more',opts:['more','again','much'],ans:0,tip:'Tell me more mantiene viva la conversación.'}, ]}, {id:'2x14', name:'Real Mini Dialogue', sub:'Natural conversation flow', qs:[ {es:'A: Nice to meet you. B:',en:'Nice to meet you, ___.',blank:'too',opts:['too','also','same'],ans:0,tip:'Nice to meet you too = igualmente.'}, {es:'A: Where are you from? B:',en:'I’m ___ Colombia.',blank:'from',opts:['from','of','in'],ans:0,tip:'I’m from + país.'}, {es:'A: Do you speak English? B:',en:'A little, but I’m ___.',blank:'learning',opts:['learn','learning','learnt'],ans:1,tip:'I’m learning = estoy aprendiendo.'}, {es:'A: See you later. B:',en:'See ___!',blank:'you',opts:['you','your','to you'],ans:0,tip:'See you! = nos vemos.'}, {es:'A: How’s it going? B:',en:'Pretty ___.',blank:'good',opts:['good','well','nice'],ans:0,validAns:[0,2],tip:'Pretty good = bastante bien.'}, ]} ], 3: [ {id:'3x16', name:'Shopping Basics', sub:'Prices, sizes and everyday needs', qs:[ {es:'¿Cuánto cuesta?',en:'How much does it ___?',blank:'cost',opts:['cost','price','pay'],ans:0,tip:'How much does it cost? pregunta el precio.'}, {es:'Estoy buscando una chaqueta.',en:'I’m looking ___ a jacket.',blank:'for',opts:['for','to','at'],ans:0,tip:'Look for = buscar.'}, {es:'¿Tiene una talla más grande?',en:'Do you have a bigger ___?',blank:'size',opts:['size','number','shape'],ans:0,tip:'Size = talla.'}, {es:'Pagaré con tarjeta.',en:'I’ll pay by ___.',blank:'card',opts:['card','cash','money'],ans:0,tip:'Pay by card = pagar con tarjeta.'}, {es:'Solo estoy mirando.',en:'I’m just ___.',blank:'looking',opts:['watching','looking','seeing'],ans:1,tip:'I’m just looking = solo estoy mirando.'}, ]}, {id:'3x17', name:'Time & Plans', sub:'Making simple daily plans', qs:[ {es:'Nos vemos a las seis.',en:'See you ___ six.',blank:'at',opts:['in','on','at'],ans:2,tip:'Horas exactas usan at.'}, {es:'Estoy libre mañana.',en:'I’m free ___.',blank:'tomorrow',opts:['yesterday','tomorrow','last night'],ans:1,tip:'Tomorrow = mañana.'}, {es:'Tengo planes esta noche.',en:'I have plans ___.',blank:'tonight',opts:['tonight','today night','in night'],ans:0,tip:'Tonight = esta noche.'}, {es:'Llegaré tarde.',en:'I’ll be ___.',blank:'late',opts:['later','late','lately'],ans:1,tip:'Be late = llegar tarde.'}, {es:'¿A qué hora?',en:'What ___?',blank:'time',opts:['hour','time','clock'],ans:1,tip:'What time? es la pregunta natural.'}, ]}, {id:'3x18', name:'Health & Body', sub:'Useful phrases when something hurts', qs:[ {es:'Me duele la cabeza.',en:'I have a ___.',blank:'headache',opts:['headache','head pain','head hurt'],ans:0,tip:'Headache = dolor de cabeza.'}, {es:'No me siento bien.',en:'I don’t feel ___.',blank:'well',opts:['good','well','nice'],ans:1,validAns:[0,1],tip:'Feel well = sentirse bien físicamente.'}, {es:'Necesito descansar.',en:'I need to ___.',blank:'rest',opts:['rest','sleepy','relaxing'],ans:0,tip:'Need to + verbo base.'}, {es:'Estoy enfermo.',en:'I’m ___.',blank:'sick',opts:['sick','illness','pain'],ans:0,tip:'I’m sick = estoy enfermo.'}, {es:'Toma agua.',en:'Drink ___.',blank:'water',opts:['water','drink','liquid'],ans:0,tip:'Drink water = tomar agua.'}, ]}, {id:'3x19', name:'Daily Problem Solving', sub:'Fix small everyday situations', qs:[ {es:'Perdí mis llaves.',en:'I lost my ___.',blank:'keys',opts:['keys','doors','locks'],ans:0,tip:'Keys = llaves.'}, {es:'Mi teléfono no funciona.',en:'My phone doesn’t ___.',blank:'work',opts:['works','work','working'],ans:1,tip:'Doesn’t + verbo base.'}, {es:'Necesito ayuda.',en:'I need ___.',blank:'help',opts:['help','helping','helper'],ans:0,tip:'Need + noun.'}, {es:'No hay internet.',en:'There is no ___.',blank:'internet',opts:['internet','signal','wifiing'],ans:0,tip:'There is no... = no hay.'}, {es:'La puerta está cerrada.',en:'The door is ___.',blank:'locked',opts:['locked','closeded','lock'],ans:0,tip:'Locked = cerrada con seguro.'}, ]} ], 4: [ {id:'4x21', name:'Past Simple Basics', sub:'Regular past actions', qs:[ {es:'Trabajé ayer.',en:'I ___ yesterday.',blank:'worked',opts:['work','worked','working'],ans:1,tip:'Pasado regular: work → worked.'}, {es:'Ella llamó anoche.',en:'She ___ last night.',blank:'called',opts:['called','call','calls'],ans:0,tip:'Call → called.'}, {es:'Nosotros vimos una película.',en:'We ___ a movie.',blank:'watched',opts:['watch','watched','watching'],ans:1,tip:'Watch → watched.'}, {es:'Él jugó fútbol.',en:'He ___ football.',blank:'played',opts:['played','plays','play'],ans:0,tip:'Play → played.'}, {es:'Estudié inglés.',en:'I ___ English.',blank:'studied',opts:['studyed','studied','study'],ans:1,tip:'Study cambia y → ied.'}, ]}, {id:'4x22', name:'Past Irregulars', sub:'went / had / saw', qs:[ {es:'Fui al parque.',en:'I ___ to the park.',blank:'went',opts:['go','went','gone'],ans:1,tip:'Go → went.'}, {es:'Tuve una idea.',en:'I ___ an idea.',blank:'had',opts:['have','had','has'],ans:1,tip:'Have → had.'}, {es:'Vi a Ana.',en:'I ___ Ana.',blank:'saw',opts:['see','saw','seen'],ans:1,tip:'See → saw.'}, {es:'Hice mi tarea.',en:'I ___ my homework.',blank:'did',opts:['do','did','done'],ans:1,tip:'Do → did.'}, {es:'Compré comida.',en:'I ___ food.',blank:'bought',opts:['buy','bought','buyed'],ans:1,tip:'Buy → bought.'}, ]}, {id:'4x23', name:'Future with Going To', sub:'Plans and intentions', qs:[ {es:'Voy a estudiar.',en:'I’m going to ___.',blank:'study',opts:['study','studying','studied'],ans:0,tip:'Going to + verbo base.'}, {es:'Ella va a viajar.',en:'She is going to ___.',blank:'travel',opts:['travels','travel','traveling'],ans:1,tip:'Going to + travel.'}, {es:'No vamos a salir.',en:'We are not going to ___.',blank:'go out',opts:['go out','going out','went out'],ans:0,tip:'Going to + verbo base.'}, {es:'¿Vas a venir?',en:'Are you going to ___?',blank:'come',opts:['come','coming','came'],ans:0,tip:'Question: Are you going to + verb?'}, {es:'Va a llover.',en:'It’s going to ___.',blank:'rain',opts:['rain','raining','rained'],ans:0,tip:'It’s going to rain.'}, ]}, {id:'4x24', name:'Comparatives', sub:'bigger / easier / better', qs:[ {es:'Este libro es más fácil.',en:'This book is ___.',blank:'easier',opts:['easyer','easier','more easy'],ans:1,tip:'Easy → easier.'}, {es:'Mi casa es más grande.',en:'My house is ___.',blank:'bigger',opts:['bigger','more big','biggest'],ans:0,tip:'Big → bigger.'}, {es:'Inglés es más útil.',en:'English is more ___.',blank:'useful',opts:['useful','usefuller','usefulest'],ans:0,tip:'Adjetivos largos usan more.'}, {es:'Esto es mejor.',en:'This is ___.',blank:'better',opts:['gooder','better','best'],ans:1,tip:'Good → better.'}, {es:'Hoy hace más frío.',en:'Today is ___.',blank:'colder',opts:['colder','more cold','coldest'],ans:0,tip:'Cold → colder.'}, ]} ], 5: [ {id:'5x26', name:'Sound Natural', sub:'Contractions and softness', qs:[ {es:'Yo soy de Colombia. Natural:',en:'___ from Colombia.',blank:'I’m',opts:['I am','I’m','Am I'],ans:1,tip:'I’m suena más natural al hablar.'}, {es:'Ella no está lista. Natural:',en:'She ___ ready.',blank:'isn’t',opts:['is not','isn’t','not is'],ans:1,tip:'Isn’t es natural y común.'}, {es:'Quiero ir.',en:'I ___ go.',blank:'wanna',opts:['wanna','gonna','gotta'],ans:0,tip:'Wanna = want to.'}, {es:'Tengo que estudiar.',en:'I ___ study.',blank:'gotta',opts:['wanna','gotta','gonna'],ans:1,tip:'Gotta = have got to.'}, {es:'Voy a practicar.',en:'I’m ___ practice.',blank:'gonna',opts:['wanna','gotta','gonna'],ans:2,tip:'Gonna = going to.'}, ]}, {id:'5x27', name:'Reacting Like a Human', sub:'Natural emotions in conversation', qs:[ {es:'¡Qué genial!',en:'That’s ___!',blank:'awesome',opts:['awesome','awful','average'],ans:0,tip:'Awesome = genial.'}, {es:'Qué pena escuchar eso.',en:'Sorry to ___ that.',blank:'hear',opts:['listen','hear','sound'],ans:1,tip:'Sorry to hear that = lamento escuchar eso.'}, {es:'¡No puede ser!',en:'No ___!',blank:'way',opts:['road','way','path'],ans:1,tip:'No way! = ¡No puede ser!'}, {es:'Me alegra por ti.',en:'I’m happy ___ you.',blank:'for',opts:['for','by','to'],ans:0,tip:'Happy for you = me alegra por ti.'}, {es:'Eso tiene sentido.',en:'That makes ___.',blank:'sense',opts:['sense','meaning','logic'],ans:0,tip:'Make sense = tener sentido.'}, ]}, {id:'5x28', name:'Soft Opinions', sub:'I think / maybe / kind of', qs:[ {es:'Creo que sí.',en:'I ___ so.',blank:'think',opts:['think','guessing','believe to'],ans:0,tip:'I think so = creo que sí.'}, {es:'Tal vez mañana.',en:'Maybe ___.',blank:'tomorrow',opts:['tomorrow','yesterday','last week'],ans:0,tip:'Maybe + time.'}, {es:'Es un poco difícil.',en:'It’s kind of ___.',blank:'difficult',opts:['difficult','difficulty','differently'],ans:0,tip:'Kind of suaviza la opinión.'}, {es:'No estoy seguro.',en:'I’m not ___.',blank:'sure',opts:['sure','safe','true'],ans:0,tip:'Sure = seguro en este contexto.'}, {es:'Para mí...',en:'For ___...',blank:'me',opts:['me','I','my'],ans:0,tip:'For me = para mí.'}, ]}, {id:'5x29', name:'Conversation Repair', sub:'When you need time', qs:[ {es:'Déjame pensar.',en:'Let me ___.',blank:'think',opts:['think','thinking','thought'],ans:0,tip:'Let me + verbo base.'}, {es:'¿Cómo lo digo?',en:'How do I ___ it?',blank:'say',opts:['say','tell','speak'],ans:0,tip:'Say it = decirlo.'}, {es:'Un segundo.',en:'One ___.',blank:'second',opts:['second','minute','hour'],ans:0,tip:'One second = un momento.'}, {es:'Eso es lo que quiero decir.',en:'That’s what I ___.',blank:'mean',opts:['mean','means','meaning'],ans:0,tip:'I mean = quiero decir.'}, {es:'No sé la palabra.',en:'I don’t know the ___.',blank:'word',opts:['word','letter','phrase'],ans:0,tip:'Word = palabra.'}, ]} ], 6: [ {id:'6x31', name:'Meetings', sub:'Clear workplace phrases', qs:[ {es:'Tengo una reunión.',en:'I have a ___.',blank:'meeting',opts:['meeting','reunion','meet'],ans:0,tip:'Meeting = reunión laboral.'}, {es:'Empecemos.',en:'Let’s ___.',blank:'start',opts:['start','starting','started'],ans:0,tip:'Let’s + verbo base.'}, {es:'Estoy de acuerdo.',en:'I ___.',blank:'agree',opts:['agree','am agree','agreement'],ans:0,tip:'I agree, no “I am agree”.'}, {es:'Buen punto.',en:'Good ___.',blank:'point',opts:['point','idea','argument'],ans:0,tip:'Good point = buen punto.'}, {es:'¿Alguna pregunta?',en:'Any ___?',blank:'questions',opts:['questions','question','doubts'],ans:0,tip:'Any questions? natural.'}, ]}, {id:'6x32', name:'Client Support', sub:'Professional help without fear', qs:[ {es:'¿Cómo puedo ayudarte?',en:'How can I ___ you?',blank:'help',opts:['help','supporting','serve'],ans:0,tip:'How can I help you? estándar.'}, {es:'Revisaré eso.',en:'I’ll check ___.',blank:'that',opts:['that','this one','itself'],ans:0,tip:'I’ll check that = revisaré eso.'}, {es:'Gracias por esperar.',en:'Thanks for ___.',blank:'waiting',opts:['wait','waiting','waited'],ans:1,tip:'For + gerundio.'}, {es:'El problema está resuelto.',en:'The issue is ___.',blank:'resolved',opts:['resolved','solveded','fix'],ans:0,tip:'Issue is resolved.'}, {es:'Te mantendré informado.',en:'I’ll keep you ___.',blank:'updated',opts:['updated','updating','update'],ans:0,tip:'Keep you updated = mantenerte informado.'}, ]}, {id:'6x33', name:'Professional Boundaries', sub:'Clear and polite limits', qs:[ {es:'No estoy disponible hoy.',en:'I’m not ___ today.',blank:'available',opts:['available','freeing','possible'],ans:0,tip:'Available = disponible.'}, {es:'Podemos reagendar.',en:'We can ___.',blank:'reschedule',opts:['reschedule','recalendar','repeat date'],ans:0,tip:'Reschedule = reprogramar.'}, {es:'Eso no es posible.',en:'That’s not ___.',blank:'possible',opts:['possible','possibly','possibility'],ans:0,tip:'Possible = posible.'}, {es:'Necesito más tiempo.',en:'I need more ___.',blank:'time',opts:['time','hour','moment'],ans:0,tip:'More time.'}, {es:'Gracias por entender.',en:'Thanks for ___.',blank:'understanding',opts:['understand','understanding','understood'],ans:1,tip:'For + gerundio.'}, ]}, {id:'6x34', name:'Action Items', sub:'Tasks, deadlines and follow-up', qs:[ {es:'Enviaré el correo.',en:'I’ll send the ___.',blank:'email',opts:['email','mailing','lettering'],ans:0,tip:'Send the email.'}, {es:'La fecha límite es mañana.',en:'The deadline is ___.',blank:'tomorrow',opts:['tomorrow','yesterday','soonly'],ans:0,tip:'Deadline = fecha límite.'}, {es:'Haré seguimiento.',en:'I’ll follow ___.',blank:'up',opts:['up','on','in'],ans:0,tip:'Follow up = hacer seguimiento.'}, {es:'Esta tarea es urgente.',en:'This task is ___.',blank:'urgent',opts:['urgent','urgency','urgently'],ans:0,tip:'Adjetivo: urgent.'}, {es:'Está listo para revisión.',en:'It’s ready for ___.',blank:'review',opts:['review','revisioning','checking up'],ans:0,tip:'Ready for review.'}, ]} ], 7: [ {id:'7x36', name:'Real Listening Logic', sub:'Understand meaning, not words', qs:[ {es:'“I’m down” significa...',en:'I’m ___ it.',blank:'okay with',opts:['okay with','under','sad about'],ans:0,tip:'I’m down = me apunto / estoy de acuerdo.'}, {es:'“Never mind” significa...',en:'Forget ___.',blank:'it',opts:['it','me','you'],ans:0,tip:'Never mind = olvídalo / no importa.'}, {es:'“Fair enough” significa...',en:'That sounds ___.',blank:'reasonable',opts:['reasonable','expensive','unfair'],ans:0,tip:'Fair enough = razonable / listo.'}, {es:'“My bad” significa...',en:'That was my ___.',blank:'mistake',opts:['mistake','good','turn'],ans:0,tip:'My bad = culpa mía.'}, {es:'“No worries” significa...',en:'It’s ___.',blank:'okay',opts:['okay','dangerous','late'],ans:0,tip:'No worries = tranquilo / no pasa nada.'}, ]}, {id:'7x37', name:'Idioms in Context', sub:'Choose by situation', qs:[ {es:'Algo muy fácil.',en:'It’s a piece of ___.',blank:'cake',opts:['cake','bread','pie'],ans:0,tip:'Piece of cake = muy fácil.'}, {es:'Estás muy ocupado.',en:'I’m swamped with ___.',blank:'work',opts:['work','water','sleep'],ans:0,tip:'Swamped = saturado.'}, {es:'Decirlo directamente.',en:'Get to the ___.',blank:'point',opts:['point','dot','line'],ans:0,tip:'Get to the point = ve al grano.'}, {es:'Buena suerte.',en:'Break a ___!',blank:'leg',opts:['leg','hand','foot'],ans:0,tip:'Break a leg = buena suerte.'}, {es:'Estoy agotado.',en:'I’m ___.',blank:'exhausted',opts:['exhausted','excited','expanded'],ans:0,tip:'Exhausted = muy cansado.'}, ]}, {id:'7x38', name:'Thinking Fast', sub:'Respond without translating', qs:[ {es:'Alguien dice “Thanks!”',en:'No ___.',blank:'problem',opts:['problem','matter','issue'],ans:0,tip:'No problem = de nada / tranquilo.'}, {es:'Alguien no entiende.',en:'Let me ___ it.',blank:'explain',opts:['explain','say','talk'],ans:0,tip:'Explain it = explicarlo.'}, {es:'Quieres confirmar.',en:'Just to ___.',blank:'confirm',opts:['confirm','safe','secure'],ans:0,tip:'Just to confirm = solo para confirmar.'}, {es:'Quieres resumir.',en:'In ___.',blank:'short',opts:['short','small','little'],ans:0,tip:'In short = en resumen.'}, {es:'Quieres cerrar.',en:'That’s ___ for now.',blank:'all',opts:['all','everything','whole'],ans:0,tip:'That’s all for now.'}, ]}, {id:'7x39', name:'Identity in English', sub:'Speak like yourself', qs:[ {es:'Estoy aprendiendo, pero mejorando.',en:'I’m learning, but I’m getting ___.',blank:'better',opts:['better','best','gooder'],ans:0,tip:'Getting better = mejorando.'}, {es:'Quiero sonar natural.',en:'I want to sound ___.',blank:'natural',opts:['natural','naturally','nature'],ans:0,tip:'Sound + adjective.'}, {es:'Puedo intentarlo.',en:'I can ___ it.',blank:'try',opts:['try','trying','tried'],ans:0,tip:'Can + verbo base.'}, {es:'No tengo miedo de equivocarme.',en:'I’m not afraid to make ___.',blank:'mistakes',opts:['mistakes','wrongs','fails'],ans:0,tip:'Make mistakes = cometer errores.'}, {es:'Estoy construyendo confianza.',en:'I’m building ___.',blank:'confidence',opts:['confidence','confident','confide'],ans:0,tip:'Confidence = confianza.'}, ]} ] }; function makeBridgeLevel(world, n) { const sample = world.levels.find(l => !l.boss) || world.levels[0]; return { id: world.id+'x'+(6+n), name:['Practice Bridge','Confidence Builder','Real Context','World Review'][n-1] || 'World Practice', sub:'Repaso aplicado sin relleno', boss:false, xp:120, qs: sample.qs.map(q => ({...q, tip:q.tip + '<br><br><strong>Puente:</strong> misma base, más velocidad mental.'})) }; } function ensureWorldStructure() { WORLDS.forEach(world => { const boss = world.levels.find(l => l.boss); let normals = world.levels.filter(l => !l.boss); const custom = WORLD_EXTENSION_LEVELS[world.id] || []; custom.forEach(l => { if (!world.levels.some(x => x.id === l.id)) normals.push({...l, boss:false, xp:120}); }); let i = 1; while (normals.length < 9) { normals.push(makeBridgeLevel(world, i++)); } world.levels = normals.slice(0,9).concat([{...boss, boss:true, xp: boss.xp || 500}]); }); } ensureWorldStructure(); const EXTRA_QUESTIONS = { 1: [ {es:'Nosotros somos hermanos.',en:'We ___ brothers.',blank:'are',opts:['am','is','are'],ans:2,tip:'We → <strong>are</strong>. Siempre.'}, {es:'¿Estás listo?',en:'___ you ready?',blank:'Are',opts:['Am','Is','Are'],ans:2,tip:'You → <strong>Are you...?</strong>'}, {es:'El cielo está nublado.',en:'The sky ___ cloudy.',blank:'is',opts:['am','is','are'],ans:1,tip:'The sky (singular) → <strong>is</strong>.'}, {es:'Yo no soy abogado.',en:'I ___ not a lawyer.',blank:'am',opts:['am','is','are'],ans:0,tip:'I am not → negativo de I am.'}, {es:'Ellas son enfermeras.',en:'They ___ nurses.',blank:'are',opts:['am','is','are'],ans:2,tip:'They → <strong>are</strong>.'}, ], 2: [ {es:'Mi hermano trabaja de noche.',en:'___ works at night.',blank:'He',opts:['He','She','It'],ans:0,tip:'Hermano → hombre → <strong>He</strong>.'}, {es:'La silla es pequeña.',en:'___ is small.',blank:'It',opts:['He','She','It'],ans:2,tip:'Objeto inanimado → <strong>It</strong>.'}, {es:'Mis amigos y yo vamos al cine.',en:'___ are going to the cinema.',blank:'We',opts:['We','They','You'],ans:0,tip:'Mis amigos + yo = <strong>We</strong>.'}, {es:'Pedro y Ana viven juntos.',en:'___ live together.',blank:'They',opts:['We','They','You'],ans:1,tip:'Pedro y Ana = dos personas = <strong>They</strong>.'}, {es:'Mi abuela habla despacio.',en:'___ speaks slowly.',blank:'She',opts:['He','She','It'],ans:1,tip:'Abuela → mujer → <strong>She</strong>.'}, ], 3: [ {es:'Él es ingeniero.',en:'He is ___ engineer.',blank:'an',opts:['a','an','the'],ans:1,tip:'Engineer empieza por vocal → <strong>an</strong>.'}, {es:'Vivo en una ciudad pequeña.',en:'I live in ___ small city.',blank:'a',opts:['a','an','the'],ans:0,tip:'City empieza por consonante → <strong>a</strong>.'}, {es:'La luna está llena.',en:'___ moon is full.',blank:'The',opts:['A','An','The'],ans:2,tip:'Solo hay una luna → <strong>The</strong>.'}, {es:'Quiero un café.',en:'I want ___ coffee.',blank:'a',opts:['a','an','the'],ans:0,tip:'Coffee empieza por consonante → <strong>a</strong>.'}, {es:'Ella es actriz.',en:'She is ___ actress.',blank:'an',opts:['a','an','the'],ans:1,tip:'Actress empieza por vocal → <strong>an</strong>.'}, ], 4: [ {es:'Hay muchos peces en el mar.',en:'There are many ___ in the sea.',blank:'fish',opts:['fishs','fishes','fish'],ans:2,tip:'Fish → <strong>fish</strong>. Plural irregular: igual que singular.'}, {es:'Los ratones son pequeños.',en:'The ___ are small.',blank:'mice',opts:['mouses','mice','mousies'],ans:1,tip:'Mouse → <strong>mice</strong>. Plural irregular.'}, {es:'Los hombres trabajan.',en:'The ___ work.',blank:'men',opts:['mans','mens','men'],ans:2,tip:'Man → <strong>men</strong>. Plural irregular.'}, {es:'Vi dos ovejas.',en:'I saw two ___.',blank:'sheep',opts:['sheeps','sheep','sheepes'],ans:1,tip:'Sheep → <strong>sheep</strong>. Mismo en singular y plural.'}, {es:'Tengo tres cajas grandes.',en:'I have three big ___.',blank:'boxes',opts:['boxs','boxes','boxies'],ans:1,tip:'Box termina en -x → <strong>boxes</strong>.'}, ], 5: [ {es:'Él está escribiendo una carta.',en:'He is ___ a letter.',blank:'writing',opts:['write','writing','wrote'],ans:1,tip:'Write → quita -e → <strong>writing</strong>.'}, {es:'Estamos esperando el bus.',en:'We are ___ the bus.',blank:'waiting',opts:['wait','waited','waiting'],ans:2,tip:'Wait → <strong>waiting</strong>. Simple consonante + ing.'}, {es:'¿Qué están haciendo?',en:'What are they ___?',blank:'doing',opts:['do','does','doing'],ans:2,tip:'Do → <strong>doing</strong>. Presente continuo.'}, {es:'Ella está nadando.',en:'She is ___.',blank:'swimming',opts:['swimm','swimming','swiming'],ans:1,tip:'Swim → doble m → <strong>swimming</strong>.'}, {es:'No estoy mintiendo.',en:'I am not ___.',blank:'lying',opts:['lieing','lying','lyeing'],ans:1,tip:'Lie → quita -e, cambia a y → <strong>lying</strong>.'}, ], '1b': [ {es:"¿Estáis ustedes estudiando juntos?",en:"___ you studying together?",blank:"Are",opts:["Are","Is","am"],ans:0,tip:"You (plural) → <strong>Are</strong> + <strong>studying</strong>."}, {es:'Tengo una naranja.',en:'I have ___ orange.',blank:'an',opts:['a','an','the'],ans:1,tip:'Orange empieza por vocal → <strong>an</strong>.'}, {es:'Los perros están corriendo.',en:'The dogs are ___.',blank:'running',opts:['run','runned','running'],ans:2,tip:'Run → doble n → <strong>running</strong>.'}, {es:"Ellas son mis mejores amigas.",en:"They ___ my best friends.",blank:"are",opts:["are","is","am"],ans:0,tip:"They → <strong>are</strong>. Varias amigas → <strong>friends</strong>."}, {es:'Ella no está durmiendo.',en:'She is not ___.',blank:'sleeping',opts:['sleep','slept','sleeping'],ans:2,tip:'Is not + <strong>sleeping</strong>. Negativo continuo.'}, ], 6: [ {es:'Buenas tardes.',en:'Good ___.',blank:'afternoon',opts:['afternoon','evening','morning'],ans:0,tip:'<strong>Good afternoon</strong> = buenas tardes.'}, {es:'¡Hasta mañana!',en:'See you ___!',blank:'tomorrow',opts:['tomorrow','later','soon'],ans:0,tip:'<strong>See you tomorrow</strong> = hasta mañana.'}, {es:'¿Todo bien?',en:'Everything ___?',blank:'OK',opts:['OK','right','good'],ans:0,tip:'<strong>Everything OK?</strong> = ¿Todo bien?'}, {es:'Hola, ¿qué tal?',en:'Hey, how ___ it going?',blank:'is',opts:['am','is','are'],ans:1,tip:'<strong>How is it going?</strong> Frase fija.'}, {es:'¡Que tengas un buen día!',en:'Have a ___ day!',blank:'great',opts:['great','good','nice'],ans:0,validAns:[0,1,2],tip:'<strong>Great/Good/Nice day</strong>. Las tres sirven.'}, ], 7: [ {es:'Tengo treinta años.',en:'I am thirty years ___.',blank:'old',opts:['old','ago','year'],ans:0,tip:'La edad: I am + número + years <strong>old</strong>.'}, {es:'Soy médico.',en:'I am a ___.',blank:'doctor',opts:['doctor','docter','docktor'],ans:0,tip:'<strong>Doctor</strong>. Deletreo correcto.'}, {es:'Vivo en Buenos Aires.',en:'I ___ in Buenos Aires.',blank:'live',opts:['leave','live','life'],ans:1,tip:'<strong>Live</strong> = vivir.'}, {es:'Tengo dos hermanas.',en:'I have two ___.',blank:'sisters',opts:['sister','sisters','sisteris'],ans:1,tip:'Plural regular: sister → <strong>sisters</strong>.'}, {es:'Encantado de conocerte.',en:'Pleased to ___ you.',blank:'meet',opts:['meet','know','see'],ans:0,tip:'<strong>Pleased to meet you</strong>.'}, ], 8: [ {es:'¿Cómo te llamas tú?',en:'What ___ your name?',blank:'is',opts:['am','is','are'],ans:1,tip:'Your name es singular → <strong>is</strong>.'}, {es:'¿Cuántos años tienes tú?',en:'How old ___ you?',blank:'are',opts:['am','is','are'],ans:2,tip:'You → <strong>are</strong>. How old are you?'}, {es:'¿Eres casado?',en:'Are you ___?',blank:'married',opts:['married','marry','marriage'],ans:0,tip:'<strong>Married</strong> = casado/a.'}, {es:'¿Tienes hijos?',en:'Do you have any ___?',blank:'children',opts:['children','childs','kids'],ans:0,validAns:[0,2],tip:'<strong>Children</strong> o <strong>kids</strong>.'}, {es:'¿Dónde trabajas?',en:'Where do you ___?',blank:'work',opts:['work','job','employ'],ans:0,tip:'<strong>Where do you work?</strong>'}, ], 9: [ {es:'A él le gusta el tenis.',en:'He ___ tennis.',blank:'likes',opts:['like','likes','is liking'],ans:1,tip:'He/She/It → <strong>likes</strong> (con -s).'}, {es:'No me gustan las verduras.',en:'I ___ like vegetables.',blank:"don't",opts:["don't","doesn't","not"],ans:0,tip:"I → <strong>don't</strong> like."}, {es:'Me encanta cocinar.',en:'I ___ cooking.',blank:'love',opts:['love','loves','loving'],ans:0,tip:'I love + <strong>gerundio</strong>.'}, {es:'¿Les gusta el jazz?',en:'Do they ___ jazz?',blank:'like',opts:['like','likes','liked'],ans:0,tip:'They → <strong>do they like</strong>?'}, {es:'A ella no le gusta madrugar.',en:'She ___ like waking up early.',blank:"doesn't",opts:["don't","doesn't","not"],ans:1,tip:"She → <strong>doesn't</strong> like."}, ], 10: [ {es:'¡Qué frío hace!',en:"It's so ___!",blank:'cold',opts:['cold','cool','freeze'],ans:0,tip:"<strong>It's so cold!</strong> = ¡Qué frío!"}, {es:'¿Adónde vas este fin de semana?',en:'Where are you going this ___?',blank:'weekend',opts:['weekend','week end','weakend'],ans:0,tip:'<strong>Weekend</strong> = fin de semana.'}, {es:'No tengo planes.',en:"I don't have any ___.",blank:'plans',opts:['plans','plannings','ideas'],ans:0,tip:"<strong>Plans</strong> = planes."}, {es:'¡Qué aburrido!',en:'How ___!',blank:'boring',opts:['boring','bored','bore'],ans:0,tip:'<strong>How boring!</strong> = ¡Qué aburrido!'}, {es:'¿Estás de acuerdo?',en:'Do you ___?',blank:'agree',opts:['agree','agreed','agreeing'],ans:0,tip:'<strong>Do you agree?</strong>'}, ], '2b': [ {es:"Saludas a alguien en la mañana.",en:"Good ___, how are you?",blank:"morning",opts:["morning","day","is"],ans:0,tip:"<strong>Good morning</strong> + <strong>how are you</strong>."}, {es:'Te preguntan dónde vives.',en:'I live ___ Madrid.',blank:'in',opts:['in','at','on'],ans:0,tip:'<strong>Live in</strong> + ciudad.'}, {es:'Le preguntas si tiene hermanos.',en:'Do you have any ___?',blank:'siblings',opts:['siblings','brothers','sisters'],ans:0,tip:'<strong>Siblings</strong> = hermanos/hermanas.'}, {es:"Cuentas tus hobbies.",en:"I ___ reading and I hate cooking.",blank:"love",opts:["love","loves","like"],ans:0,tip:"<strong>Like / dislike</strong> también funciona."}, {es:'Terminas la conversación amistosamente.',en:'It was great ___ to you!',blank:'talking',opts:['talking','to talk','talk'],ans:0,tip:'<strong>It was great talking to you!</strong>'}, ], 11: [ {es:'El baño está en el segundo apartamento.',en:'The bathroom is on the second ___.',blank:'floor',opts:['floor','level','stage'],ans:0,tip:'<strong>Floor</strong> = apartamento/planta.'}, {es:'Pongo la ropa en el armario.',en:'I put my clothes in the ___.',blank:'wardrobe',opts:['wardrobe','closet','both work'],ans:0,validAns:[0,1,2],tip:'<strong>Wardrobe</strong> (UK) y <strong>closet</strong> (US). Ambos correctos.'}, {es:'Hay un sofá en el salón.',en:'There is a ___ in the living room.',blank:'sofa',opts:['sofa','couch','both work'],ans:0,validAns:[0,1,2],tip:'<strong>Sofa</strong> y <strong>couch</strong> son sinónimos.'}, {es:'Apago la luz antes de dormir.',en:'I turn ___ the light before sleeping.',blank:'off',opts:['off','out','down'],ans:0,tip:'<strong>Turn off</strong> = apagar.'}, {es:'El jardín está detrás de la casa.',en:'The garden is ___ the house.',blank:'behind',opts:['behind','under','next'],ans:0,tip:'<strong>Behind</strong> = detrás de.'}, ], 12: [ {es:'Prefiero el té al café.',en:'I prefer ___ to coffee.',blank:'tea',opts:['tea','the tea','tee'],ans:0,tip:'<strong>Tea</strong> = té.'}, {es:'Soy vegetariano.',en:'I am a ___.',blank:'vegetarian',opts:['vegetarian','vegetal','vegetable'],ans:0,tip:'<strong>Vegetarian</strong> = vegetariano.'}, {es:'¿Puedo ver la carta?',en:'Can I see the ___?',blank:'menu',opts:['menu','card','list'],ans:0,tip:'<strong>Menu</strong> = carta del restaurante.'}, {es:'Tengo sed.',en:"I'm ___.",blank:'thirsty',opts:['thirsty','hungry','tired'],ans:0,tip:"<strong>Thirsty</strong> = sediento."}, {es:'La cena está lista.',en:'Dinner is ___.',blank:'ready',opts:['ready','done','finished'],ans:0,tip:'<strong>Dinner is ready</strong> = la cena está lista.'}, ], 13: [ {es:'Me lavo los dientes.',en:'I brush my ___.',blank:'teeth',opts:['teeth','tooth','teeths'],ans:0,tip:'<strong>Brush my teeth</strong>. Teeth = plural de tooth.'}, {es:'Salgo de casa a las ocho.',en:'I ___ home at eight.',blank:'leave',opts:['leave','left','go out of'],ans:0,tip:'<strong>Leave home</strong> = salir de casa.'}, {es:'Almuerzo en el trabajo.',en:'I have ___ at work.',blank:'lunch',opts:['lunch','dinner','breakfast'],ans:0,tip:'<strong>Lunch</strong> = almuerzo.'}, {es:'Vuelvo a casa a las seis.',en:'I ___ home at six.',blank:'get back',opts:['get back','come','return'],ans:0,tip:'<strong>Get back home</strong> = volver a casa.'}, {es:'Veo las noticias por la noche.',en:'I watch the ___ at night.',blank:'news',opts:['news','new','novel'],ans:0,tip:'<strong>News</strong> = las noticias. Siempre singular.'}, ], 14: [ {es:'Hace viento.',en:"It's ___.",blank:'windy',opts:['windy','wind','winding'],ans:0,tip:'Wind → adjetivo <strong>windy</strong>.'}, {es:'Hay tormenta.',en:"There's a ___.",blank:'storm',opts:['storm','stomp','stormy'],ans:0,tip:"<strong>There's a storm</strong> = hay una tormenta."}, {es:'El otoño es fresco.',en:'Autumn is ___.',blank:'cool',opts:['cool','cold','fresh'],ans:0,tip:'<strong>Cool</strong> = fresco.'}, {es:'Esta semana hará sol.',en:'It will be ___ this week.',blank:'sunny',opts:['sunny','sun','sunshine'],ans:0,tip:'<strong>Sunny</strong> = soleado.'}, {es:'¿Cuántos grados hace?',en:'How many ___ is it?',blank:'degrees',opts:['degrees','grade','celsius'],ans:0,tip:'<strong>Degrees</strong> = grados.'}, ], 15: [ {es:'Está enfrente del hotel.',en:"It's ___ the hotel.",blank:'opposite',opts:['opposite','in front','facing'],ans:0,tip:'<strong>Opposite</strong> (UK) = enfrente de.'}, {es:'Gira a la derecha en el semáforo.',en:'Turn ___ at the traffic light.',blank:'right',opts:['right','left','straight'],ans:0,tip:'<strong>Turn right</strong> = gira a la derecha.'}, {es:'Sigue por esta calle.',en:'___ down this street.',blank:'Go',opts:['Go','Walk','Take'],ans:0,tip:'<strong>Go down this street</strong>.'}, {es:'Está a diez minutos andando.',en:"It's ten minutes ___.",blank:'on foot',opts:['on foot','by walking','with foot'],ans:0,tip:'<strong>On foot</strong> = a pie.'}, {es:'¿Hay una farmacia por aquí?',en:'Is there a ___ near here?',blank:'pharmacy',opts:['pharmacy','farmacy','farmacia'],ans:0,tip:'<strong>Pharmacy</strong> = farmacia.'}, ], '3b': [ {es:"Describes tu casa.",en:"I live in a house with a big ___ and a small bedroom.",blank:"kitchen",opts:["kitchen","room","garden"],ans:0,tip:"<strong>Kitchen</strong> + <strong>bedroom</strong>."}, {es:'Hablas de tu comida favorita.',en:'I love ___, but I ___ like spicy food.',blank:"pasta / don't",opts:["pasta / don't","pasta / doesn't","food / not"],ans:0,tip:"I → <strong>don't</strong>."}, {es:"Explicas tu rutina de mañana.",en:"I wake up, take a ___, and have breakfast.",blank:"shower",opts:["shower","bath","is"],ans:0,tip:"<strong>Take a shower</strong> + <strong>have breakfast</strong>."}, {es:"Describes el tiempo.",en:"Today it's ___ and a bit windy.",blank:"cloudy",opts:["cloudy","sun","raining"],ans:0,tip:"Adjetivos: <strong>cloudy</strong> + <strong>windy</strong>."}, {es:"Das direcciones sencillas.",en:"Go ___ and turn left at the corner.",blank:"straight",opts:["straight","ahead","forward"],ans:0,tip:"<strong>Go straight</strong> + <strong>turn left/right</strong>."}, ], 16: [ {es:'Ella nunca llega tarde.',en:'She ___ arrives late.',blank:'never',opts:['never','not','no'],ans:0,tip:'Adverbios de frecuencia van antes del verbo.'}, {es:'¿Cuándo empieza la película?',en:'When ___ the movie start?',blank:'does',opts:['do','does','is'],ans:1,tip:'The movie (singular) → <strong>does</strong>.'}, {es:'No comemos carne los lunes.',en:'We ___ eat meat on Mondays.',blank:"don't",opts:["don't","doesn't","not"],ans:0,tip:"We → <strong>don't</strong>."}, {es:'El avión sale a las tres.',en:'The plane ___ at three.',blank:'leaves',opts:['leave','leaves','is leaving'],ans:1,tip:'The plane (singular) → <strong>leaves</strong>.'}, {es:'Ella toca la guitarra muy bien.',en:'She ___ the guitar very well.',blank:'plays',opts:['play','plays','playing'],ans:1,tip:'She → <strong>plays</strong>.'}, ], 17: [ {es:'¿Ella habla francés?',en:'___ she speak French?',blank:'Does',opts:['Do','Does','Is'],ans:1,tip:'She → <strong>Does</strong>.'}, {es:'Él no entiende el problema.',en:'He ___ understand the problem.',blank:"doesn't",opts:["don't","doesn't","not"],ans:1,tip:"He → <strong>doesn't</strong>."}, {es:'¿Ustedes vivís aquí?',en:'___ you live here?',blank:'Do',opts:['Do','Does','Are'],ans:0,tip:'You → <strong>Do</strong> you live...?'}, {es:'Ellos no saben nadar.',en:'They ___ know how to swim.',blank:"don't",opts:["don't","doesn't","can't"],ans:0,tip:"They → <strong>don't</strong>."}, {es:'¿A qué hora cierra el banco?',en:'What time ___ the bank close?',blank:'does',opts:['do','does','is'],ans:1,tip:'The bank (singular) → <strong>does</strong>.'}, ], 18: [ {es:'¿Dónde vives?',en:'___ do you live?',blank:'Where',opts:['Where','When','Why'],ans:0,tip:'<strong>Where</strong> = dónde.'}, {es:'¿Cómo llegaste aquí?',en:'___ did you get here?',blank:'How',opts:['How','What','Who'],ans:0,tip:'<strong>How</strong> = cómo.'}, {es:'¿Con quién hablas?',en:'___ are you talking to?',blank:'Who',opts:['Who','Whom','What'],ans:0,tip:'<strong>Who</strong> = ¿con quién?'}, {es:'¿Cuánto cuesta esto?',en:'___ much is this?',blank:'How',opts:['How','What','Which'],ans:0,tip:'<strong>How much</strong> = ¿cuánto cuesta?'}, {es:'¿Cuál prefieres?',en:'___ do you prefer?',blank:'Which',opts:['Which','What','Who'],ans:0,tip:'<strong>Which</strong> = cuál. Entre opciones concretas.'}, ], 19: [ {es:'No hay nada en la nevera.',en:'There is ___ in the fridge.',blank:'nothing',opts:['nothing','anything','something'],ans:0,tip:'<strong>Nothing</strong> = nada.'}, {es:'Él nunca lee el periódico.',en:'He ___ reads the newspaper.',blank:'never',opts:['never','not','no'],ans:0,tip:'<strong>Never</strong> con verbo afirmativo.'}, {es:'No somos de aquí.',en:"We ___ from here.",blank:"aren't",opts:["don't","aren't","not"],ans:1,tip:"To be negativo: We <strong>aren't</strong>."}, {es:'No he comido nada.',en:"I haven't eaten ___.",blank:'anything',opts:['anything','nothing','something'],ans:0,tip:"Con negativo (haven't) → <strong>anything</strong>."}, {es:'Tampoco yo.',en:'___ do I.',blank:'Neither',opts:['Neither','Nor','Either'],ans:0,tip:'<strong>Neither do I</strong> = yo tampoco.'}, ], 20: [ {es:'Él frecuentemente viaja por trabajo.',en:'He ___ travels for work.',blank:'frequently',opts:['frequently','frequent','frequentely'],ans:0,tip:'<strong>Frequently</strong> = frecuentemente.'}, {es:'¿Vas al gimnasio normalmente?',en:'Do you ___ go to the gym?',blank:'usually',opts:['usually','use','usally'],ans:0,tip:'<strong>Usually</strong> va antes del verbo.'}, {es:'Ella casi nunca llega puntual.',en:'She ___ arrives on time.',blank:'rarely',opts:['rarely','sometimes','often'],ans:0,tip:'<strong>Rarely</strong> = rara vez.'}, {es:'Siempre me cepillo los dientes.',en:'I ___ brush my teeth.',blank:'always',opts:['always','ever','usually'],ans:0,tip:'<strong>Always</strong> antes del verbo.'}, {es:'¿Has estado alguna vez en París?',en:'Have you ___ been to Paris?',blank:'ever',opts:['ever','never','always'],ans:0,tip:'<strong>Ever</strong> en preguntas = alguna vez.'}, ], '4b': [ {es:'¿Cuál es CORRECTA?',en:"A: Do she work here? B: Does she work here?",blank:'B',opts:['A es correcta','B es correcta','Ambas liston'],ans:1,tip:'She → <strong>Does</strong>. "Do she" es incorrecto.'}, {es:'¿Cuál es CORRECTA?',en:"A: Where you live? B: Where do you live?",blank:'B',opts:['A es correcta','B es correcta','Las dos son iguales'],ans:1,tip:'Wh- preguntas necesitan <strong>do/does</strong>.'}, {es:'¿Cuál es CORRECTA?',en:"A: I not eat meat. B: I don't eat meat.",blank:'B',opts:['A es correcta','B es correcta','Depende'],ans:1,tip:'Negativo con I: <strong>don\'t</strong>.'}, {es:'¿Cuál es CORRECTA?',en:"A: He usually goes to work. B: He goes usually to work.",blank:'A',opts:['A es correcta','B es correcta','Las dos liston'],ans:0,tip:'Adverbios de frecuencia van <strong>antes</strong> del verbo.'}, {es:'¿Cuál es CORRECTA?',en:"A: How much costs this? B: How much does this cost?",blank:'B',opts:['A es correcta','B es correcta','Ambas mal'],ans:1,tip:'<strong>How much does this cost?</strong>'}, ], '1x6': [ {es:'Yo no soy tu enemigo.',en:'I ___ not your enemy.',blank:'am',opts:['am','is','are'],ans:0,tip:'I am not → negativo con I.'}, {es:'¿No estás cansado?',en:'___ you tired?',blank:'Aren\'t',opts:['Aren\'t','Isn\'t','Am not'],ans:0,tip:'<strong>Aren\'t you</strong> = ¿No estás?'}, {es:'El examen no es difícil.',en:'The exam ___ difficult.',blank:'isn\'t',opts:['isn\'t','aren\'t','am not'],ans:0,tip:'The exam (singular) → <strong>isn\'t</strong>.'}, {es:'No estamos perdidos.',en:'We ___ lost.',blank:'aren\'t',opts:['isn\'t','aren\'t','am not'],ans:1,tip:'We → <strong>aren\'t</strong>.'}, {es:'La tienda no está abierta.',en:'The shop ___ open.',blank:'isn\'t',opts:['isn\'t','aren\'t','not is'],ans:0,tip:'The shop (singular) → <strong>isn\'t</strong>.'}, ], '1x7': [ {es:'¿Estáis ustedes listos?',en:'___ you all ready?',blank:'Are',opts:['Am','Is','Are'],ans:2,tip:'You (all) → <strong>Are</strong>.'}, {es:'¿Es ella tu profesora?',en:'___ she your teacher?',blank:'Is',opts:['Is','Are','Am'],ans:0,tip:'She → <strong>Is she...?</strong>'}, {es:'¿Está la tienda abierta?',en:'___ the shop open?',blank:'Is',opts:['Are','Is','Am'],ans:1,tip:'The shop (singular) → <strong>Is it/the shop...?</strong>'}, {es:'¿Sois amigos ustedes dos?',en:'___ you two friends?',blank:'Are',opts:['Is','Am','Are'],ans:2,tip:'You two → <strong>Are</strong>.'}, {es:'¿Está todo bien?',en:'___ everything OK?',blank:'Is',opts:['Are','Is','Am'],ans:1,tip:'Everything (singular) → <strong>Is</strong>.'}, ], '1x8': [ {es:'Aquella mesa es grande.',en:'___ table is big.',blank:'That',opts:['This','These','That'],ans:2,tip:'That = esa/ese, singular y lejos.'}, {es:'Estos zapatos son míos.',en:'___ shoes are mine.',blank:'These',opts:['This','These','That'],ans:1,tip:'These = estos/estas, plural y cerca.'}, {es:'¿Qué es eso?',en:'What is ___?',blank:'that',opts:['this','those','that'],ans:2,tip:'That = eso, singular y lejos.'}, {es:'Esas manzanas son rojas.',en:'___ apples are red.',blank:'Those',opts:['That','This','Those'],ans:2,tip:'Those = esas/esos, plural y lejos.'}, {es:'Este café está caliente.',en:'___ coffee is hot.',blank:'This',opts:['This','That','These'],ans:0,tip:'This = este/esta, singular y cerca.'}, ], '1x9': [ {es:'Él es muy inteligente.',en:'He is very ___.',blank:'intelligent',opts:['intelligent','intelligently','intelligence'],ans:0,tip:'Adjetivo: <strong>intelligent</strong>.'}, {es:'Hay un árbol en el jardín.',en:'There is ___ tree in the garden.',blank:'a',opts:['a','an','the'],ans:0,tip:'Tree empieza por consonante → <strong>a</strong>.'}, {es:'Somos una familia.',en:'We are ___ family.',blank:'a',opts:['a','an','the'],ans:0,tip:'Family empieza por consonante → <strong>a</strong>.'}, {es:'Tiene tres hermanos.',en:'He has three ___.',blank:'brothers',opts:['brother','brothers','brotherses'],ans:1,tip:'Plural regular: brother → <strong>brothers</strong>.'}, {es:'Están jugando en el parque.',en:'They are ___ in the park.',blank:'playing',opts:['play','plays','playing'],ans:2,tip:'Are + <strong>playing</strong>. Presente continuo.'}, ], '2x11': [ {es:'¿Puedes hablar más despacio?',en:'Can you speak more ___?',blank:'slowly',opts:['slow','slowly','slower'],ans:1,tip:'<strong>Slowly</strong> = adverbio de lentitud.'}, {es:'Con permiso.',en:'___ me.',blank:'Excuse',opts:['Sorry','Excuse','Pardon'],ans:1,tip:'<strong>Excuse me</strong> = con permiso.'}, {es:'No hay problema.',en:'No ___.',blank:'problem',opts:['problem','issue','worry'],ans:0,tip:'<strong>No problem</strong> = no hay problema.'}, {es:'¿Me puedes ayudar?',en:'Can you ___ me?',blank:'help',opts:['help','aid','support'],ans:0,tip:'<strong>Can you help me?</strong> Petición educada.'}, {es:'Muchas gracias.',en:'Thank you very ___.',blank:'much',opts:['much','many','more'],ans:0,tip:'<strong>Thank you very much</strong> = muchas gracias.'}, ], '2x12': [ {es:'¿Puedes repetirlo?',en:'Can you ___ that again?',blank:'say',opts:['say','tell','repeat'],ans:2,tip:'<strong>Repeat that</strong> o <strong>say that again</strong>.'}, {es:'No te entiendo bien.',en:'I don\'t ___ you well.',blank:'understand',opts:['understand','hear','know'],ans:0,tip:'<strong>Understand</strong> = entender.'}, {es:'¿Puedes escribirlo?',en:'Can you ___ it down?',blank:'write',opts:['write','note','put'],ans:0,tip:'<strong>Write it down</strong> = escríbelo.'}, {es:'¿En inglés?',en:'In ___?',blank:'English',opts:['English','english','Englishly'],ans:0,tip:'<strong>English</strong> con mayúscula.'}, {es:'Hablo un poco.',en:'I speak a ___.',blank:'little',opts:['little','few','small'],ans:0,tip:'<strong>A little</strong> = un poco (con incontables).'}, ], '2x13': [ {es:'¿De verdad?',en:'Is that ___?',blank:'so',opts:['so','true','real'],ans:0,tip:'<strong>Is that so?</strong> = ¿De verdad?'}, {es:'¿Por ejemplo?',en:'___ example?',blank:'For',opts:['For','Like','Such'],ans:0,tip:'<strong>For example</strong> = por ejemplo.'}, {es:'¿Cómo es eso?',en:'How is ___?',blank:'that',opts:['that','this','it'],ans:0,tip:'<strong>How is that?</strong> = ¿cómo es eso?'}, {es:'¿Cuándo, por ejemplo?',en:'___ for example?',blank:'When',opts:['When','Where','Who'],ans:0,tip:'<strong>When</strong> para preguntar tiempo.'}, {es:'¿Qué más?',en:'What ___?',blank:'else',opts:['else','more','other'],ans:0,tip:'<strong>What else?</strong> = ¿qué más?'}, ], '2x14': [ {es:'A: Gracias. B:',en:'You\'re ___.',blank:'welcome',opts:['welcome','fine','good'],ans:0,tip:'<strong>You\'re welcome</strong> = de nada.'}, {es:'A: ¿Te llamas Ana? B:',en:'Yes, that\'s ___.',blank:'right',opts:['right','good','true'],ans:0,tip:'<strong>That\'s right</strong> = sí, así es.'}, {es:'A: ¿Haces algo mañana? B:',en:'Not really, I\'m ___ free.',blank:'pretty',opts:['pretty','very','quite'],ans:2,tip:'<strong>Pretty/quite free</strong>. Bastante libre.'}, {es:'A: ¿Cuánto tiempo llevas aquí? B:',en:'About two ___.',blank:'years',opts:['years','months','days'],ans:0,tip:'Pregunta de duración → About + tiempo.'}, {es:'A: ¿Estás aprendiendo inglés? B:',en:'Yes, I\'m ___ to improve.',blank:'trying',opts:['trying','try','tried'],ans:0,tip:'<strong>I\'m trying to</strong> = estoy intentando.'}, ], '3x16': [ {es:'¿Tienes tu talla?',en:'Do you have my ___?',blank:'size',opts:['size','measure','number'],ans:0,tip:'<strong>Size</strong> = talla o talla/medida.'}, {es:'¿Puedo probármelo?',en:'Can I ___ it on?',blank:'try',opts:['try','put','wear'],ans:0,tip:'<strong>Try it on</strong> = probárselo.'}, {es:'¿Cuánto es en total?',en:'How much is ___ together?',blank:'it',opts:['it','that','all'],ans:2,tip:'<strong>How much is it all together?</strong>'}, {es:'¿Aceptan tarjeta?',en:'Do you ___ cards?',blank:'accept',opts:['accept','take','allow'],ans:0,tip:'<strong>Accept cards</strong> = aceptar tarjetas.'}, {es:'Me la llevo.',en:'I\'ll ___ it.',blank:'take',opts:['take','buy','have'],ans:0,tip:'<strong>I\'ll take it</strong> = me lo llevo.'}, ], '3x17': [ {es:'¿Estás libre el viernes?',en:'Are you free on ___?',blank:'Friday',opts:['Friday','the Friday','friday'],ans:0,tip:'Días de la semana con mayúscula, sin artículo: on <strong>Friday</strong>.'}, {es:'Llegué tarde.',en:'I ___ late.',blank:'arrived',opts:['arrived','arrive','arriving'],ans:0,tip:'Past simple: arrive → <strong>arrived</strong>.'}, {es:'¿Nos vemos a las tres?',en:'Shall we meet ___ three?',blank:'at',opts:['at','in','on'],ans:0,tip:'Horas concretas: <strong>at</strong> three.'}, {es:'Tenemos poco tiempo.',en:'We don\'t have much ___.',blank:'time',opts:['time','times','hours'],ans:0,tip:'<strong>Much time</strong>. Time es incontable en este sentido.'}, {es:'¿A qué hora abren?',en:'What time do they ___?',blank:'open',opts:['open','opens','opening'],ans:0,tip:'They → <strong>do they open</strong>?'}, ], '3x18': [ {es:'Me duele la garganta.',en:'I have a sore ___.',blank:'throat',opts:['throat','neck','voice'],ans:0,tip:'Sore throat = dolor de garganta.'}, {es:'Deberías descansar.',en:'You ___ rest.',blank:'should',opts:['should','must','can'],ans:0,tip:'<strong>Should</strong> = deberías. Consejo.'}, {es:'¿Has tomado algún medicamento?',en:'Have you taken any ___?',blank:'medicine',opts:['medicine','drug','pill'],ans:0,tip:'<strong>Medicine</strong> = medicamento.'}, {es:'Me siento mucho mejor.',en:'I feel much ___.',blank:'better',opts:['better','good','well'],ans:0,tip:'<strong>Feel better</strong> = sentirse mejor. Comparativo.'}, {es:'¿Con qué frecuencia entrenas?',en:'How ___ do you exercise?',blank:'often',opts:['often','much','many'],ans:0,tip:'<strong>How often</strong> = ¿con qué frecuencia?'}, ], '3x19': [ {es:'No encuentro mi teléfono.',en:'I can\'t ___ my phone.',blank:'find',opts:['find','look','search'],ans:0,tip:'<strong>Can\'t find</strong> = no puedo encontrar.'}, {es:'¿Puedes llamarme?',en:'Can you ___ me?',blank:'call',opts:['call','ring','phone'],ans:2,tip:'<strong>Call/ring/phone</strong> = llamar. Las tres son correctas.'}, {es:'Se ha roto.',en:'It\'s ___.',blank:'broken',opts:['broken','broke','breaking'],ans:0,tip:'<strong>Broken</strong> = roto/a. Adjetivo.'}, {es:'Necesito una solución.',en:'I need a ___.',blank:'solution',opts:['solution','solve','solving'],ans:0,tip:'<strong>Solution</strong> = solución (sustantivo).'}, {es:'Eso es un problema.',en:'That\'s a ___.',blank:'problem',opts:['problem','issue','trouble'],ans:2,tip:'<strong>Problem/issue/trouble</strong> son sinónimos en este contexto.'}, ], '4x21': [ {es:'Visitamos a los abuelos.',en:'We ___ our grandparents.',blank:'visited',opts:['visit','visited','visiting'],ans:1,tip:'Past simple regular: visit → <strong>visited</strong>.'}, {es:'Cocinó algo delicioso.',en:'She ___ something delicious.',blank:'cooked',opts:['cook','cooked','cooking'],ans:1,tip:'Cook → <strong>cooked</strong>.'}, {es:'Llegaron tarde.',en:'They ___ late.',blank:'arrived',opts:['arrive','arrived','arriving'],ans:1,tip:'Arrive → <strong>arrived</strong>.'}, {es:'Limpié la habitación.',en:'I ___ the room.',blank:'cleaned',opts:['clean','cleaned','cleaning'],ans:1,tip:'Clean → <strong>cleaned</strong>.'}, {es:'Llamé a mi mamá.',en:'I ___ my mom.',blank:'called',opts:['call','called','calling'],ans:1,tip:'Call → <strong>called</strong>.'}, ], '4x22': [ {es:'Fui al mercado.',en:'I ___ to the market.',blank:'went',opts:['go','went','gone'],ans:1,tip:'Go → <strong>went</strong>. Irregular.'}, {es:'Comimos pizza.',en:'We ___ pizza.',blank:'ate',opts:['eat','ate','eaten'],ans:1,tip:'Eat → <strong>ate</strong>. Irregular.'}, {es:'Él trajo flores.',en:'He ___ flowers.',blank:'brought',opts:['bring','brought','bringed'],ans:1,tip:'Bring → <strong>brought</strong>. Irregular.'}, {es:'Leí un buen libro.',en:'I ___ a good book.',blank:'read',opts:['read','readed','red'],ans:0,tip:'Read → <strong>read</strong> (pronunciado "red"). Irregular.'}, {es:'Ellas vinieron temprano.',en:'They ___ early.',blank:'came',opts:['come','came','comed'],ans:1,tip:'Come → <strong>came</strong>. Irregular.'}, ], '4x23': [ {es:'¿Qué vas a hacer mañana?',en:'What are you going to ___ tomorrow?',blank:'do',opts:['do','doing','did'],ans:0,tip:'Going to + <strong>verbo base</strong>.'}, {es:'Vamos a aprender juntos.',en:'We are going to ___ together.',blank:'learn',opts:['learn','learning','learned'],ans:0,tip:'Going to + <strong>learn</strong>.'}, {es:'Ellos no van a llegar.',en:'They are not going to ___.',blank:'arrive',opts:['arrive','arriving','arrived'],ans:0,tip:'Going to + <strong>verbo base</strong>.'}, {es:'¿Va a llover?',en:'Is it going to ___?',blank:'rain',opts:['rain','raining','rained'],ans:0,tip:'Going to + <strong>rain</strong>.'}, {es:'Voy a estudiar más.',en:'I\'m going to ___ more.',blank:'study',opts:['study','studying','studied'],ans:0,tip:'Going to + <strong>study</strong>.'}, ], '4x24': [ {es:'El libro es más interesante que la película.',en:'The book is more ___ than the movie.',blank:'interesting',opts:['interesting','interestinger','interestingmore'],ans:0,tip:'Adjetivos largos → <strong>more</strong> + adjetivo.'}, {es:'Este café es más caliente.',en:'This coffee is ___.',blank:'hotter',opts:['hotter','more hot','hotest'],ans:0,tip:'Hot → <strong>hotter</strong>. Doble consonante.'}, {es:'Inglés es más fácil que el chino.',en:'English is ___ than Chinese.',blank:'easier',opts:['easyer','easier','more easy'],ans:1,tip:'Easy → <strong>easier</strong>. Doble consonante no, cambia y→i.'}, {es:'Este es el mejor resultado.',en:'This is the ___.',blank:'best',opts:['best','better','good'],ans:0,tip:'<strong>Best</strong> = el mejor. Superlativo de good.'}, {es:'Es menos difícil de lo que parece.',en:'It\'s ___ difficult than it looks.',blank:'less',opts:['less','fewer','lesser'],ans:0,tip:'<strong>Less</strong> = menos + adjetivo.'}, ], }; function attachExtraQuestions() { const worldIds = [1, 2, 3, 4]; WORLDS.forEach(world => { if (!worldIds.includes(world.id)) return; world.levels.forEach(level => { const extra = EXTRA_QUESTIONS[level.id]; if (extra && level.qs.length < 10) { level.qs = level.qs.concat(extra); } }); }); } attachExtraQuestions(); const TOTAL_LEVELS = 70; function loadState() { try { const s = localStorage.getItem('englishxp_v2'); if (s) return JSON.parse(s); } catch {} return { totalXp: 0, xpBalance: 0, spentXp: 0, streak: 1, lastPlayed: null, completed: {}, medals: {}, hints: 5, char: { hat: null, shirt: null, owned: [] } }; } function saveState() { try { localStorage.setItem('englishxp_v2', JSON.stringify(state)); } catch {} } let state = loadState(); if (!state.char) state.char = { hat: null, shirt: null, owned: [] }; if (!Array.isArray(state.char.owned)) state.char.owned = []; if (typeof state.spentXp !== 'number') state.spentXp = 0; if (typeof state.xpBalance !== 'number') state.xpBalance = Math.max(0, (state.totalXp||0) - (state.spentXp||0)); if (!state.char.owned.includes('h_none')) state.char.owned.push('h_none'); if (!state.char.owned.includes('s_none')) state.char.owned.push('s_none'); const CHAR_LEVELS = [ {xp:0, body:'🐣', name:'Pollito en cáscara'}, {xp:100, body:'🐥', name:'Pollito'}, {xp:300, body:'🐱', name:'Gato'}, {xp:550, body:'🐶', name:'Perro'}, {xp:900, body:'🐸', name:'Sapo'}, {xp:1300, body:'🐵', name:'Mono'}, {xp:1800, body:'🤪', name:'Loco'}, {xp:2400, body:'🦊', name:'Zorro'}, {xp:3200, body:'🦁', name:'León'}, ]; function getCharLevel() { let cl = CHAR_LEVELS[0]; for (const l of CHAR_LEVELS) { if (state.totalXp >= l.xp) cl = l; } return cl; } function getCharLevelNum() { let n = 1; for (let i = 0; i < CHAR_LEVELS.length; i++) { if (state.totalXp >= CHAR_LEVELS[i].xp) n = i+1; } return n; } const WARDROBE_ITEMS = [ { id:'h_none', type:'hat', icon:'', name:'Sin sombrero', req:0, free:true }, { id:'h_cap', type:'hat', icon:'🧢', name:'Gorra', req:100, cost:60, free:true }, { id:'h_top', type:'hat', icon:'🎩', name:'Chistera', req:500, cost:160, free:true }, { id:'h_grad', type:'hat', icon:'🎓', name:'Birrete', req:1000, cost:280, free:true }, { id:'h_crown', type:'hat', icon:'👑', name:'Corona', req:2500, cost:650, free:true }, { id:'s_none', type:'shirt', icon:'', name:'Sin accesorio', req:0, free:true }, { id:'s_bow', type:'shirt', icon:'🎀', name:'Moño', req:3, cost:80, free:true }, { id:'s_heart', type:'shirt', icon:'❤️', name:'Corazón', req:8, cost:180, free:true }, { id:'s_fire', type:'shirt', icon:'🔥', name:'Llama', req:15, cost:360, free:true }, { id:'s_dj', type:'shirt', icon:'🎧', name:'Auriculares DJ', req:25, cost:700, free:true }, { id:'s_rainbow', type:'shirt', icon:'🌈', name:'Arcoiris', req:35, cost:1000, free:true }, ]; function completedCount() { return Object.keys(state.completed).length; } function isItemProgressUnlocked(item) { if (item.req === 0 || item.id === 'h_none' || item.id === 's_none') return true; if (item.type === 'hat') return state.totalXp >= item.req; if (item.type === 'shirt') return completedCount() >= item.req; return false; } function isItemOwned(item) { if (item.req === 0 || item.id === 'h_none' || item.id === 's_none') return true; if (item.premium) return state.char.owned.includes(item.id); return state.char.owned.includes(item.id); } function isItemUnlocked(item) { return isItemProgressUnlocked(item) && isItemOwned(item); } function buyItem(item) { const cost = item.cost || 0; if (!isItemProgressUnlocked(item)) { showToast('🔒 Primero desbloquéalo avanzando'); return false; } if (state.xpBalance < cost) { showToast('🧠 Necesitas '+(cost-state.xpBalance)+' XP más para comprarlo'); return false; } state.xpBalance -= cost; state.spentXp += cost; if (!state.char.owned.includes(item.id)) state.char.owned.push(item.id); saveState(); showToast('🛍️ Comprado: '+item.icon+' '+item.name+' · -'+cost+' XP'); showPhilosophy('shop'); SFX.unlock(); return true; } function equipItem(id) { const item = WARDROBE_ITEMS.find(i => i.id === id); if (!item) return; if (item.premium && !isItemOwned(item)) { openDonation(); return; } if (!isItemOwned(item)) { if (!buyItem(item)) return; } if (!isItemUnlocked(item)) { showToast('🔒 Sigue avanzando para desbloquear esto'); return; } if (item.type === 'hat') state.char.hat = id; if (item.type === 'shirt') state.char.shirt = id; saveState(); renderWardrobe(); updateAllMascots(); SFX.click(); } function getMascotHat() { if (!state.char.hat) return ''; const item = WARDROBE_ITEMS.find(i => i.id === state.char.hat); return item ? item.icon : ''; } function getMascotShirt() { if (!state.char.shirt) return ''; const item = WARDROBE_ITEMS.find(i => i.id === state.char.shirt); return item ? item.icon : ''; } function updateAllMascots() { const cl = getCharLevel(); const body = cl.body; const hat = getMascotHat(); const shirt = getMascotShirt(); const lvlNum = getCharLevelNum(); ['map','lesson','quiz','complete'].forEach(prefix => { const m = document.getElementById(prefix+'-mascot'); if (m) { m.childNodes[0].textContent = body; } const h = document.getElementById(prefix+'-hat'); if (h) h.textContent = hat; const s = document.getElementById(prefix+'-shirt'); if (s) s.textContent = shirt; }); const badge = document.getElementById('map-mascot-level'); if (badge) badge.textContent = 'Nv.'+lvlNum; const wc = document.getElementById('wd-char'); if (wc) { wc.childNodes[0].textContent = body; } const wh = document.getElementById('wd-hat'); if (wh) wh.textContent = hat; const ws = document.getElementById('wd-shirt'); if (ws) ws.textContent = shirt; const wn = document.getElementById('wd-name'); if (wn) wn.textContent = cl.name; const wl = document.getElementById('wd-level'); if (wl) wl.textContent = 'Nivel '+lvlNum+' · '+state.xpBalance+' XP disponibles · '+state.totalXp+' ganados'; const qn = document.getElementById('quiz-char-name'); if (qn) qn.textContent = cl.name; } let wardrobeReturnScreen = 'screen-map'; function openWardrobe() { SFX.click(); const active = document.querySelector('.screen.active'); wardrobeReturnScreen = active ? active.id : 'screen-map'; renderWardrobe(); show('screen-wardrobe'); } function closeWardrobe() { SFX.click(); if (wardrobeReturnScreen === 'screen-quiz') { updateAllMascots(); show('screen-quiz'); return; } if (wardrobeReturnScreen === 'screen-lesson') { updateAllMascots(); show('screen-lesson'); return; } if (wardrobeReturnScreen === 'screen-complete') { updateAllMascots(); show('screen-complete'); return; } goToMap(); } function renderWardrobe() { updateAllMascots(); const sec = document.getElementById('wardrobe-sections'); sec.innerHTML = ''; const sections = [ { title: '🎩 Sombreros — desbloquea con XP', items: WARDROBE_ITEMS.filter(i=>i.type==='hat'&&i.free), }, ]; sections.forEach(s => { const div = document.createElement('div'); div.className = 'wardrobe-section'; let html = '<div class="wardrobe-section-title">'+s.title+'</div><div class="wardrobe-grid">'; s.items.forEach(item => { const unlocked = isItemUnlocked(item); const equipped = (item.type==='hat' && state.char.hat===item.id) || (item.type==='shirt' && state.char.shirt===item.id); let reqText = ''; if (item.free && item.req > 0) { if (item.type==='hat') reqText = '<div class="witem-req">'+item.req+' XP</div>'; else reqText = '<div class="witem-req">'+item.req+' niveles</div>'; } if (item.premium) reqText = '<div class="witem-premium">'+item.price+'</div>'; html += '<div class="witem'+(equipped?' equipped':'')+((!unlocked)?' locked-item':'')+'" onclick="equipItem(\''+item.id+'\')">' +'<div class="witem-icon">'+(item.icon||'⬜')+'</div>' +'<div class="witem-name">'+item.name+'</div>' +reqText +'</div>'; }); html += '</div>'; div.innerHTML = html; sec.appendChild(div); }); } function showToast(msg) { const t = document.getElementById('item-toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500); } function checkNewUnlocks(prevXp) { const newXp = state.totalXp; const prevLevels = completedCount() - 1; const newLevels = completedCount(); let unlocked = []; WARDROBE_ITEMS.forEach(item => { if (!item.free) return; if (item.req === 0) return; if (item.type === 'hat') { if (prevXp < item.req && newXp >= item.req) unlocked.push(item); } if (item.type === 'shirt') { if (prevLevels < item.req && newLevels >= item.req) unlocked.push(item); } }); if (unlocked.length > 0) { setTimeout(() => { showToast('🎉 ¡'+unlocked[0].icon+' '+unlocked[0].name+' desbloqueado!'); SFX.unlock(); }, 1200); } } const LESSONS = { '1x6': { hero:{icon:'🚫', title:'Negatives with To Be', sub:'am not / isn\'t / aren\'t'}, rules:[
    {title:'📌 Cómo negar con To Be', content:'Para negar simplemente añade <strong>not</strong> después del verbo:<br><br>👤 <strong>I am not</strong> → I\'m not (NO: I amn\'t)<br>👩 <strong>He/She/It is not</strong> → He\'s not / He <strong>isn\'t</strong><br>👥 <strong>You/We/They are not</strong> → You\'re not / You <strong>aren\'t</strong>'},
    {title:'🗣️ Ejemplos reales', content:'<div class="lesson-example">😴 I\'m not tired. → No estoy cansado.</div><div class="lesson-example">🏠 She isn\'t at home. → Ella no está en casa.</div><div class="lesson-example">🌧️ They aren\'t ready. → No están listos.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Con "I" la única forma es <strong>I\'m not</strong> — no existe "I amn\'t". Con He/She/It → <strong>isn\'t</strong>. Con todo lo demás → <strong>aren\'t</strong>.</div>'},
  ]},
  '1x7': { hero:{icon:'❓', title:'Questions with To Be', sub:'Am / Is / Are questions'}, rules:[
    {title:'📌 Cómo hacer preguntas', content:'En inglés la pregunta invierte el sujeto y el verbo:<br><br>✅ <strong>Are you</strong> ready? ← (you are → are you)<br>✅ <strong>Is she</strong> a doctor?<br>✅ <strong>Am I</strong> late?<br><br>🔧 Estructura: <strong>Am/Is/Are + sujeto + resto?</strong>'},
    {title:'🗣️ Ejemplos y respuestas', content:'<div class="lesson-example">❓ Is he your brother? → Yes, he is. / No, he isn\'t.</div><div class="lesson-example">❓ Are they students? → Yes, they are. / No, they aren\'t.</div><div class="lesson-example">❓ Am I in the right place? → Yes, you are!</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Respuestas cortas: siempre repite el verbo to be. "Yes, he is." ✅ — nunca "Yes, he." ❌. El verbo to be no se omite en respuestas cortas.</div>'},
  ]},
  '1x8': { hero:{icon:'👆', title:'This / That / These / Those', sub:'Señalar cosas'}, rules:[
    {title:'📌 Los cuatro demostrativos', content:'👆 <strong>This</strong> = esto / este / esta → <em>singular, CERCA de ti</em><br>👉 <strong>That</strong> = eso / ese / esa → <em>singular, LEJOS de ti</em><br>👆👆 <strong>These</strong> = estos / estas → <em>plural, CERCA de ti</em><br>👉👉 <strong>Those</strong> = esos / esas → <em>plural, LEJOS de ti</em>'},
    {title:'🗣️ Ejemplos visuales', content:'<div class="lesson-example">📱 <strong>This</strong> is my phone. → (lo tienes en la mano)</div><div class="lesson-example">🏠 <strong>That</strong> is a big house. → (la ves a lo lejos)</div><div class="lesson-example">👟 <strong>These</strong> shoes are new. → (los llevas puestos)</div><div class="lesson-example">🌳 <strong>Those</strong> trees are tall. → (están al fondo)</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Regla fácil: <strong>Th-IS / Th-ESE = aquí</strong> (IS y HERE terminan diferente pero ambos son cerca). <strong>Th-AT / Th-OSE = allá</strong>. Singular → This/That. Plural → These/Those.</div>'},
  ]},
  '1x9': { hero:{icon:'🏗️', title:'Build Simple Sentences', sub:'Orden y sentido'}, rules:[
    {title:'📌 El orden en inglés', content:'El inglés tiene un orden fijo: <strong>Sujeto → Verbo → Complemento</strong><br><br>✅ <em>She <strong>eats</strong> an apple.</em> (S-V-C)<br>❌ <em>An apple eats she.</em> (incorrecto)<br><br>⚠️ En inglés el orden NO es flexible como en español.</br>No puedes mover el sujeto al final.'},
    {title:'🗣️ Oraciones modelo', content:'<div class="lesson-example">👦 <strong>He</strong> plays football. → Él juega fútbol.</div><div class="lesson-example">👩 <strong>My mother</strong> cooks every day.</div><div class="lesson-example">🐱 <strong>The cat</strong> sleeps on the sofa.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Si tienes dudas, pregúntate: ¿quién hace la acción? → eso va primero. ¿qué hace? → eso va segundo. ¿a qué/quién? → eso va al final.</div>'},
  ]},
  '2x11': { hero:{icon:'🙏', title:'Polite English', sub:'please / sorry / excuse me'}, rules:[
    {title:'📌 Las palabras mágicas', content:'🙏 <strong>Please</strong> → por favor (al final o después del verbo)<br>😔 <strong>Sorry</strong> → lo siento / perdón (disculpa sincera)<br>🚶 <strong>Excuse me</strong> → con permiso / perdona (para interrumpir o pasar)<br>🙌 <strong>Thank you</strong> → gracias<br>😊 <strong>You\'re welcome</strong> → de nada'},
    {title:'🗣️ Cuándo usar cada una', content:'<div class="lesson-example">☕ "Can I have a coffee, <strong>please</strong>?" → pedido educado</div><div class="lesson-example">😔 "I\'m <strong>sorry</strong> I\'m late." → disculpa real</div><div class="lesson-example">🚶 "<strong>Excuse me</strong>, is this seat taken?" → interrumpir</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>Sorry</strong> = lo siento (emoción). <strong>Excuse me</strong> = con permiso (acción). En España confunden mucho estas dos. "Excuse me" nunca implica que cometiste un error.</div>'},
  ]},
  '2x12': { hero:{icon:'🤝', title:'Asking for Help', sub:'Can you...? Could you...?'}, rules:[
    {title:'📌 Pedir ayuda en inglés', content:'💬 <strong>Can you help me?</strong> → ¿Puedes ayudarme? (informal)<br>🎩 <strong>Could you help me?</strong> → ¿Podría ayudarme? (más formal/educado)<br>🙏 <strong>Would you mind...?</strong> → ¿Le importaría...? (muy formal)<br>❓ <strong>Do you know...?</strong> → ¿Sabes...?'},
    {title:'🗣️ Situaciones reales', content:'<div class="lesson-example">🗺️ "Excuse me, <strong>could you</strong> tell me where the station is?"</div><div class="lesson-example">📷 "Can you take a photo of us, please?"</div><div class="lesson-example">🔊 "Would you mind speaking more slowly?"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>Can</strong> = informal/amigos. <strong>Could</strong> = formal/educado con desconocidos. En duda, usa <strong>Could</strong> — nunca suena mal y siempre es apropiado.</div>'},
  ]},
  '2x13': { hero:{icon:'🔗', title:'Follow-up Questions', sub:'Keep the conversation alive'}, rules:[
    {title:'📌 Preguntas de seguimiento', content:'Son las preguntas que hacen que la conversación fluya:<br><br>😮 <strong>Really?</strong> → ¿En serio?<br>🤔 <strong>And you?</strong> → ¿Y tú?<br>💬 <strong>What do you mean?</strong> → ¿Qué quieres decir?<br>📖 <strong>Tell me more.</strong> → Cuéntame más.<br>❓ <strong>Why is that?</strong> → ¿Por qué?'},
    {title:'🗣️ Conversación en acción', content:'<div class="lesson-example">💬 A: "I love hiking." → B: "Really? <strong>Where do you usually go?</strong>"</div><div class="lesson-example">💬 A: "I\'m a teacher." → B: "<strong>What do you teach?</strong>"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 La pregunta de seguimiento más versátil es <strong>"Oh really? And how was it?"</strong> — funciona para casi cualquier cosa que alguien te cuente.</div>'},
  ]},
  '2x14': { hero:{icon:'🎭', title:'Real Mini Dialogue', sub:'Natural conversation flow'}, rules:[
    {title:'📌 Cómo fluye una conversación real', content:'Una conversación natural tiene estos pasos:<br><br>1️⃣ <strong>Saludo</strong> → Hi! How are you?<br>2️⃣ <strong>Tema</strong> → I just got back from London!<br>3️⃣ <strong>Reacción</strong> → Oh wow, really?<br>4️⃣ <strong>Pregunta</strong> → How was it?<br>5️⃣ <strong>Respuesta</strong> → It was amazing!'},
    {title:'🗣️ Mini diálogo completo', content:'<div class="lesson-example">👋 A: Hey! How\'s it going?</div><div class="lesson-example">😊 B: Pretty good! I just started a new job.</div><div class="lesson-example">😮 A: Oh nice! What kind of work?</div><div class="lesson-example">👩‍💼 B: I\'m in marketing. It\'s quite fun actually.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 No necesitas vocabulario perfecto — necesitas <strong>reaccionar</strong> y <strong>preguntar</strong>. "Oh really?" + una pregunta = conversación infinita.</div>'},
  ]},
  '3x16': { hero:{icon:'🛒', title:'Shopping Basics', sub:'Prices, sizes and everyday needs'}, rules:[
    {title:'📌 Frases esenciales de compras', content:'💰 <strong>How much is it?</strong> → ¿Cuánto cuesta?<br>👗 <strong>Do you have it in a smaller/bigger size?</strong><br>🛍️ <strong>I\'ll take it.</strong> → Me lo llevo.<br>💳 <strong>Can I pay by card?</strong> → ¿Puedo pagar con tarjeta?<br>🔄 <strong>Can I return this?</strong> → ¿Puedo devolverlo?'},
    {title:'🗣️ En la tienda', content:'<div class="lesson-example">🏷️ "Excuse me, <strong>how much</strong> is this jacket?"</div><div class="lesson-example">👕 "Do you have this in a <strong>medium</strong>?"</div><div class="lesson-example">💳 "I\'ll take it. <strong>Do you take cards?</strong>"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"I\'ll take it"</strong> es la frase de compra más natural — no "I buy it" ❌. También útil: "I\'m just looking, thanks" cuando no quieres que te molesten.</div>'},
  ]},
  '3x17': { hero:{icon:'🕐', title:'Time & Plans', sub:'Making simple daily plans'}, rules:[
    {title:'📌 Hablar de tiempo y planes', content:'⏰ <strong>What time is it?</strong> → ¿Qué hora es?<br>📅 <strong>What are you doing this weekend?</strong><br>✅ <strong>I\'m free on Saturday.</strong> → Estoy libre el sábado.<br>📍 <strong>Let\'s meet at 3.</strong> → Quedemos a las 3.<br>🔜 <strong>See you then!</strong> → ¡Hasta entonces!'},
    {title:'🗣️ Organizar un plan', content:'<div class="lesson-example">📱 A: "Are you free on Friday evening?"</div><div class="lesson-example">😊 B: "Yes! What do you have in mind?"</div><div class="lesson-example">🎬 A: "There\'s a good film on. Let\'s go at 7."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Para decir la hora: <strong>It\'s 3 o\'clock / It\'s half past 3 / It\'s quarter to 4</strong>. En el habla cotidiana: "It\'s 3:15" (tres quince) también funciona perfectamente.</div>'},
  ]},
  '3x18': { hero:{icon:'🏥', title:'Health & Body', sub:'Useful phrases when something hurts'}, rules:[
    {title:'📌 Describir cómo te sientes', content:'🤒 <strong>I don\'t feel well.</strong> → No me siento bien.<br>🤕 <strong>I have a headache.</strong> → Tengo dolor de cabeza.<br>🤢 <strong>I feel sick.</strong> → Me encuentro mal.<br>💊 <strong>I need a doctor.</strong> → Necesito un médico.<br>🌡️ <strong>I have a temperature.</strong> → Tengo fiebre.'},
    {title:'🗣️ Partes del cuerpo', content:'<div class="lesson-example">🦷 My <strong>tooth</strong> hurts. → Me duele una muela.</div><div class="lesson-example">🦵 I hurt my <strong>knee</strong>. → Me lastimé la rodilla.</div><div class="lesson-example">👁️ My <strong>eyes</strong> are tired. → Tengo los ojos cansados.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"I have a + [parte] + ache"</strong> = me duele: headache, stomachache, backache, toothache. ¡Úsalo y sonarás muy natural!</div>'},
  ]},
  '3x19': { hero:{icon:'🔧', title:'Daily Problem Solving', sub:'Fix small everyday situations'}, rules:[
    {title:'📌 Resolver problemas cotidianos', content:'❓ <strong>I\'m lost. Can you help me?</strong><br>🔌 <strong>It\'s not working.</strong> → No funciona.<br>🚿 <strong>There\'s no hot water.</strong><br>📶 <strong>The wifi is down.</strong> → No hay wifi.<br>🔑 <strong>I\'ve lost my key.</strong> → Perdí mi llave.'},
    {title:'🗣️ Frases de solución', content:'<div class="lesson-example">🛎️ "Excuse me, the air conditioning <strong>isn\'t working</strong>."</div><div class="lesson-example">🗺️ "I think <strong>I\'m lost</strong>. How do I get to the centre?"</div><div class="lesson-example">💡 "Do you know how to <strong>fix</strong> this?"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"It\'s not working"</strong> funciona para CUALQUIER cosa rota o que no funciona — la tele, el ascensor, tu inglés 😄. Es la frase más útil del inglés práctico.</div>'},
  ]},
  '4x21': { hero:{icon:'⏮️', title:'Past Simple Basics', sub:'Regular past actions'}, rules:[
    {title:'📌 El pasado simple regular', content:'Para hablar de acciones terminadas en el pasado:<br><br>🔧 <strong>Verbo + -ed</strong> para la mayoría:<br>work → work<strong>ed</strong> · play → play<strong>ed</strong> · watch → watch<strong>ed</strong><br><br>❌ Negativo: <strong>didn\'t + verbo base</strong><br>❓ Pregunta: <strong>Did + sujeto + verbo base?</strong>'},
    {title:'🗣️ Ejemplos', content:'<div class="lesson-example">⚽ I <strong>played</strong> football yesterday.</div><div class="lesson-example">❌ She <strong>didn\'t work</strong> on Monday.</div><div class="lesson-example">❓ Did you <strong>watch</strong> the film?</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Después de <strong>didn\'t</strong> el verbo siempre vuelve a la base: "I didn\'t <strong>work</strong>" ✅ — nunca "I didn\'t worked" ❌. El auxiliar did ya lleva el pasado.</div>'},
  ]},
  '4x22': { hero:{icon:'⚡', title:'Past Irregulars', sub:'went / had / saw'}, rules:[
    {title:'📌 Los irregulares más usados', content:'🔄 Estos verbos no usan -ed, tienen forma propia:<br><br>go → <strong>went</strong> &nbsp;|&nbsp; have → <strong>had</strong><br>see → <strong>saw</strong> &nbsp;|&nbsp; get → <strong>got</strong><br>make → <strong>made</strong> &nbsp;|&nbsp; come → <strong>came</strong><br>eat → <strong>ate</strong> &nbsp;|&nbsp; know → <strong>knew</strong>'},
    {title:'🗣️ En contexto', content:'<div class="lesson-example">✈️ I <strong>went</strong> to Paris last summer.</div><div class="lesson-example">🍕 We <strong>had</strong> pizza for dinner.</div><div class="lesson-example">🎬 She <strong>saw</strong> a great film.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 La buena noticia: los irregulares NO cambian para He/She/It en pasado. "She went" ✅ no "She goed" ❌. Todos los sujetos usan la misma forma irregular.</div>'},
  ]},
  '4x23': { hero:{icon:'🔜', title:'Future with Going To', sub:'Plans and intentions'}, rules:[
    {title:'📌 Planes con going to', content:'Para hablar de planes o intenciones:<br><br>🔧 <strong>am/is/are + going to + verbo base</strong><br><br>👤 I\'m going to <strong>study</strong> tonight.<br>👩 She\'s going to <strong>visit</strong> her family.<br>👥 They\'re going to <strong>move</strong> to London.'},
    {title:'🗣️ Planes reales', content:'<div class="lesson-example">✈️ We\'re going to <strong>travel</strong> to Mexico next month.</div><div class="lesson-example">🏋️ I\'m going to <strong>start</strong> going to the gym.</div><div class="lesson-example">🎓 She\'s going to <strong>graduate</strong> in June.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>Going to</strong> = plan concreto (ya lo decidiste). <strong>Will</strong> = decisión en el momento o predicción. "I\'m going to buy a car" (ya lo pensé) vs "I\'ll have the soup" (decidido ahora).</div>'},
  ]},
  '4x24': { hero:{icon:'📏', title:'Comparatives', sub:'bigger / easier / better'}, rules:[
    {title:'📌 Cómo comparar en inglés', content:'➕ Adjetivos cortos (1 sílaba): añade <strong>-er</strong><br>big → <strong>bigger</strong> · fast → <strong>faster</strong> · tall → <strong>taller</strong><br><br>➕ Adjetivos largos (2+ sílabas): añade <strong>more</strong><br>expensive → <strong>more expensive</strong><br>interesting → <strong>more interesting</strong><br><br>⚠️ Irregulares: good → <strong>better</strong> · bad → <strong>worse</strong>'},
    {title:'🗣️ Comparando', content:'<div class="lesson-example">🏃 He\'s <strong>faster</strong> than me.</div><div class="lesson-example">💻 This laptop is <strong>more expensive</strong> than the other.</div><div class="lesson-example">☕ This coffee is <strong>better</strong> than yesterday\'s.</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Siempre usa <strong>than</strong> después del comparativo: "bigger <strong>than</strong>" ✅ — nunca "bigger of" ❌. Y recuerda doblar la consonante final: big → big<strong>g</strong>er, hot → hot<strong>t</strong>er.</div>'},
  ]},
  '5x26': { hero:{icon:'🎵', title:'Sound Natural', sub:'Contractions and softness'}, rules:[
    {title:'📌 Habla más natural con contracciones', content:'Los nativos siempre usan contracciones al hablar:<br><br>🔹 I am → <strong>I\'m</strong> · You are → <strong>You\'re</strong><br>🔹 He is → <strong>He\'s</strong> · We are → <strong>We\'re</strong><br>🔹 I have → <strong>I\'ve</strong> · I will → <strong>I\'ll</strong><br>🔹 do not → <strong>don\'t</strong> · cannot → <strong>can\'t</strong>'},
    {title:'🗣️ Formal vs natural', content:'<div class="lesson-example">😐 "I am not going to do it." → muy formal</div><div class="lesson-example">😊 "I\'m not gonna do it." → natural</div><div class="lesson-example">😐 "I would like to..." → correcto pero rígido</div><div class="lesson-example">😊 "I\'d like to..." → fluido y natural</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Si suenas "demasiado correcto" en inglés, usas pocas contracciones. Habla en voz alta con contracciones y verás cómo el ritmo cambia. El inglés natural es rápido y conectado.</div>'},
  ]},
  '5x27': { hero:{icon:'😮', title:'Reacting Like a Human', sub:'Natural emotions in conversation'}, rules:[
    {title:'📌 Reacciones naturales', content:'😮 <strong>No way!</strong> → ¡No me lo creo!<br>🤩 <strong>That\'s amazing!</strong> → ¡Increíble!<br>😢 <strong>That\'s too bad.</strong> → Qué pena.<br>😂 <strong>That\'s hilarious!</strong> → ¡Qué gracioso!<br>🙌 <strong>Good for you!</strong> → ¡Qué bien por ti!<br>😤 <strong>That\'s not fair!</strong> → ¡No es justo!'},
    {title:'🗣️ En conversación', content:'<div class="lesson-example">📢 "I got promoted!" → "<strong>No way! That\'s amazing!</strong>"</div><div class="lesson-example">😔 "I failed the exam." → "<strong>That\'s too bad. I\'m sorry.</strong>"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Las reacciones se aprenden como <strong>bloques</strong>. No las construyas — recuérdalas. "No way!" no significa "ningún camino". Es una unidad de sorpresa.</div>'},
  ]},
  '5x28': { hero:{icon:'💭', title:'Soft Opinions', sub:'I think / maybe / kind of'}, rules:[
    {title:'📌 Cómo dar opiniones suaves', content:'💭 <strong>I think...</strong> → Creo que...<br>🤔 <strong>I\'m not sure, but...</strong> → No estoy seguro, pero...<br>😐 <strong>Kind of / Sort of</strong> → más o menos / un poco<br>💬 <strong>Maybe / Perhaps</strong> → quizás<br>👤 <strong>In my opinion...</strong> → En mi opinión...'},
    {title:'🗣️ Opinar sin imponer', content:'<div class="lesson-example">💭 "I <strong>think</strong> it\'s a good idea, but I\'m not sure."</div><div class="lesson-example">😐 "It\'s <strong>kind of</strong> expensive, isn\'t it?"</div><div class="lesson-example">🤷 "<strong>Maybe</strong> we should try somewhere else."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Kind of"</strong> y <strong>"sort of"</strong> son iguales en uso diario. Suavizar una opinión con estas palabras es muy inglés — muestra humildad y apertura al diálogo.</div>'},
  ]},
  '5x29': { hero:{icon:'⏸️', title:'Conversation Repair', sub:'When you need time'}, rules:[
    {title:'📌 Ganar tiempo en una conversación', content:'⏸️ <strong>Let me think...</strong> → Déjame pensar...<br>🔁 <strong>Sorry, could you repeat that?</strong><br>🐢 <strong>Could you speak more slowly?</strong><br>❓ <strong>What do you mean by...?</strong><br>✏️ <strong>How do you spell that?</strong> → ¿Cómo se escribe?'},
    {title:'🗣️ Reparar sin pánico', content:'<div class="lesson-example">🤔 "That\'s a good question. <strong>Let me think about that.</strong>"</div><div class="lesson-example">👂 "I\'m sorry, <strong>could you say that again?</strong>"</div><div class="lesson-example">🐢 "Could you speak <strong>a bit more slowly</strong>, please?"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Pedir que repitan NO es muestra de ignorancia — es señal de atención. Los nativos lo hacen constantemente. "Sorry, I didn\'t catch that" es perfectamente natural.</div>'},
  ]},
  '6x31': { hero:{icon:'💼', title:'Meetings', sub:'Clear workplace phrases'}, rules:[
    {title:'📌 Vocabulario de reuniones', content:'📋 <strong>Let\'s get started.</strong> → Empecemos.<br>📌 <strong>The purpose of this meeting is...</strong><br>🙋 <strong>Can I add something?</strong> → ¿Puedo añadir algo?<br>✅ <strong>Let\'s wrap up.</strong> → Terminemos/Cerremos.<br>📝 <strong>To summarize...</strong> → Para resumir...'},
    {title:'🗣️ Frases clave', content:'<div class="lesson-example">🚀 "Let\'s <strong>get started</strong> — we have a lot to cover."</div><div class="lesson-example">🙋 "Sorry to interrupt, <strong>can I add something?</strong>"</div><div class="lesson-example">✅ "OK, let\'s <strong>wrap up</strong>. The action items are..."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 En reuniones en inglés, di <strong>"I\'d like to add..."</strong> antes de hablar — nunca interrumpas directamente. Muestra profesionalismo y respeto al turno de palabra.</div>'},
  ]},
  '6x32': { hero:{icon:'📞', title:'Client Support', sub:'Professional help without fear'}, rules:[
    {title:'📌 Atender a un cliente', content:'😊 <strong>How can I help you today?</strong><br>🔍 <strong>Let me look into that for you.</strong><br>⏳ <strong>I\'ll get back to you shortly.</strong><br>😔 <strong>I apologize for the inconvenience.</strong><br>✅ <strong>Is there anything else I can help with?</strong>'},
    {title:'🗣️ En situación real', content:'<div class="lesson-example">📞 "Thank you for calling. <strong>How can I help you today?</strong>"</div><div class="lesson-example">🔍 "Let me <strong>look into that</strong> for you right away."</div><div class="lesson-example">⏳ "I\'ll <strong>get back to you</strong> within 24 hours."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"I\'ll look into it"</strong> es la frase más profesional para ganar tiempo — promete acción sin comprometerte a una respuesta inmediata. Úsala siempre que necesites investigar.</div>'},
  ]},
  '6x33': { hero:{icon:'🚧', title:'Professional Boundaries', sub:'Clear and polite limits'}, rules:[
    {title:'📌 Poner límites con educación', content:'🚧 <strong>That\'s outside my scope.</strong> → Eso está fuera de mis responsabilidades.<br>📅 <strong>I\'m not available until...</strong><br>↩️ <strong>I\'ll need to check with my team.</strong><br>⛔ <strong>I\'m afraid that won\'t be possible.</strong><br>🔄 <strong>Let\'s revisit this later.</strong>'},
    {title:'🗣️ Decir no con clase', content:'<div class="lesson-example">⛔ "I\'m afraid <strong>that won\'t be possible</strong> this week."</div><div class="lesson-example">↩️ "I\'ll need to <strong>check with my manager</strong> first."</div><div class="lesson-example">📅 "I\'m not <strong>available</strong> until Thursday."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Empieza siempre con <strong>"I\'m afraid..."</strong> para suavizar un no — es más diplomático que un "no" directo. En inglés profesional, el cómo dices las cosas importa tanto como qué dices.</div>'},
  ]},
  '6x34': { hero:{icon:'📋', title:'Action Items', sub:'Tasks, deadlines and follow-up'}, rules:[
    {title:'📌 Gestionar tareas en inglés', content:'📋 <strong>Action item</strong> → tarea asignada en reunión<br>⏰ <strong>Deadline</strong> → fecha límite<br>🔄 <strong>Follow up</strong> → hacer seguimiento<br>✅ <strong>Sign off on</strong> → dar el visto bueno<br>📊 <strong>Update</strong> → actualizar / dar una actualización'},
    {title:'🗣️ Frases de proyecto', content:'<div class="lesson-example">📋 "The <strong>action item</strong> is to send the report by Friday."</div><div class="lesson-example">⏰ "What\'s the <strong>deadline</strong> for this?"</div><div class="lesson-example">🔄 "I\'ll <strong>follow up</strong> with the client tomorrow."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"I\'ll follow up"</strong> es una promesa de acción — úsala cuando quieres mostrar proactividad. "Let me follow up on that" da muy buena imagen en entornos profesionales.</div>'},
  ]},
  '7x36': { hero:{icon:'👂', title:'Real Listening Logic', sub:'Understand meaning, not words'}, rules:[
    {title:'📌 Escuchar el significado', content:'En inglés real, los nativos:<br><br>🔗 Unen palabras: "going to" → "gonna"<br>✂️ Reducen: "want to" → "wanna" / "have to" → "hafta"<br>⚡ Hablan rápido y sincopado<br><br>✅ El truco: escucha el <strong>contexto y ritmo</strong>, no cada palabra individual.'},
    {title:'🗣️ Patrones del inglés rápido', content:'<div class="lesson-example">🗣️ "Whadya think?" = "What do you think?"</div><div class="lesson-example">🗣️ "Dunno" = "I don\'t know"</div><div class="lesson-example">🗣️ "Gonna hafta" = "Going to have to"</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 No te paralices cuando no entiendes una palabra. El <strong>70% de comprensión</strong> es suficiente para responder correctamente. El contexto siempre da el significado.</div>'},
  ]},
  '7x37': { hero:{icon:'🔀', title:'Idioms in Context', sub:'Choose by situation'}, rules:[
    {title:'📌 Idioms por situación', content:'🎂 <strong>Piece of cake</strong> → facilísimo<br>🌧️ <strong>Under the weather</strong> → mal / enfermo<br>🎯 <strong>Hit the nail on the head</strong> → dar en el clavo<br>🧊 <strong>Break the ice</strong> → romper el hielo<br>💰 <strong>Cost an arm and a leg</strong> → costar un ojo de la cara'},
    {title:'🗣️ En contexto real', content:'<div class="lesson-example">😊 "Don\'t worry, the test is a <strong>piece of cake</strong>."</div><div class="lesson-example">🤒 "I can\'t come in — I\'m <strong>under the weather</strong>."</div><div class="lesson-example">🎯 "You <strong>hit the nail on the head</strong> with that point."</div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Aprende idioms con su situación, no con su traducción. "Under the weather" no es sobre lluvia — es sobre sentirse mal. La situación es la clave para recordarlos.</div>'},
  ]},
  '7x38': { hero:{icon:'⚡', title:'Thinking Fast', sub:'Respond without translating'}, rules:[
    {title:'📌 Responder sin traducir', content:'El objetivo final: pensar <strong>directamente en inglés</strong><br><br>🧠 Frases automáticas para ganar tiempo:<br>💬 <strong>"That\'s a good point."</strong><br>💬 <strong>"Let me think about that."</strong><br>💬 <strong>"Exactly / Absolutely."</strong><br>💬 <strong>"I see what you mean."</strong>'},
    {title:'🗣️ Técnicas', content:'<div class="lesson-example">🔁 En vez de traducir: usa frases puente como "Well..." "So..." "Actually..."</div><div class="lesson-example">⚡ En vez de buscar la palabra exacta: describe con lo que sabes: "the thing you use to..." </div>'},
    {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Si llegas hasta aquí, ya NO necesitas traducir en tu cabeza. Cuando sientas una emoción o tengas un pensamiento — <strong>intenta ponerlo en inglés directamente</strong>. Ese es el salto.</div>'},
  ]},
  '7x39': { hero:{icon:'🌟', title:'Identity in English', sub:'Speak like yourself'}, rules:[
    {title:'📌 Tu voz en inglés', content:'El inglés no te cambia — te <strong>amplía</strong>. Puedes ser:<br><br>😄 Divertido: "Honestly, it\'s a bit of a disaster."<br>🤔 Reflexivo: "I think there\'s more to it than that."<br>💪 Directo: "Let\'s cut to the chase."<br>🌱 Humilde: "I\'m still learning, but..."'},
    {title:'🗣️ Habla como tú', content:'<div class="lesson-example">😄 "To be honest, I have no idea — but let\'s figure it out!"</div><div class="lesson-example">💪 "I disagree. Here\'s my take on it..."</div><div class="lesson-example">🌱 "My English isn\'t perfect, but I\'ll give it a go!"</div>'},
    {title:'💡 Mensaje final', content:'<div class="lesson-tip">🏆 Llegaste al final. El inglés ya es tuyo. No es un idioma extranjero — es <strong>una extensión de quién eres</strong>. Habla con confianza, con tu estilo, con tu personalidad. ¡Eso es fluidez real!</div>'},
  ]}, 1: { hero:{icon:'🌱', title:'Verb To Be', sub:'am / is / are — el primer verbo'}, rules:[ {title:'📌 ¿Qué es el Verb To Be?', content:'El verbo <strong>to be</strong> significa <em>"ser"</em> o <em>"estar"</em>. Cambia según quién habla:<br><br>👤 <strong>I → am</strong> &nbsp;(solo yo)<br>👤 <strong>He / She / It → is</strong> &nbsp;(una persona, cosa o animal)<br>👥 <strong>You / We / They → are</strong> &nbsp;(tú, nosotros, ellos)'}, {title:'🗣️ Ejemplos reales', content:'<div class="lesson-example">👋 <em>I <strong>am</strong> a student.</em> → Soy estudiante.</div><div class="lesson-example">👩‍⚕️ <em>She <strong>is</strong> a doctor.</em> → Ella es doctora.</div><div class="lesson-example">🤝 <em>They <strong>are</strong> friends.</em> → Son amigos.</div><div class="lesson-example">🐱 <em>It <strong>is</strong> my cat.</em> → Es mi gato.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>AM</strong> solo con I. <strong>IS</strong> con una sola persona/cosa. <strong>ARE</strong> con todo lo demás. Fácil: singular especial → is, yo → am, resto → are.</div>'}, ]}, 2: { hero:{icon:'👤', title:'Pronombres', sub:'I, You, He, She, It, We, They'}, rules:[ {title:'📌 Los 7 pronombres personales', content:'👤 <strong>I</strong> → yo &nbsp;|&nbsp; 👥 <strong>You</strong> → tú / ustedes<br>🙋‍♂️ <strong>He</strong> → él &nbsp;|&nbsp; 🙋‍♀️ <strong>She</strong> → ella<br>🐶 <strong>It</strong> → cosa / animal (no tiene género)<br>👫 <strong>We</strong> → nosotros &nbsp;|&nbsp; 👥 <strong>They</strong> → ellos'}, {title:'🗣️ Cómo elegir el correcto', content:'<div class="lesson-example">👩 Mi mamá → <strong>She</strong> works a lot.</div><div class="lesson-example">👦+👤 Juan y yo → <strong>We</strong> are brothers.</div><div class="lesson-example">🐱 El gato → <strong>It</strong> sleeps all day.</div><div class="lesson-example">🏠 La casa → <strong>It</strong> is big.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 ¿Es una persona? → He o She. ¿Es una cosa o animal? → It. ¿Eres tú + otra(s) persona(s)? → We. ¿Hablas a alguien? → You.</div>'}, ]}, 3: { hero:{icon:'📖', title:'Artículos', sub:'a / an / the'}, rules:[ {title:'📌 ¿Cuándo usar cada uno?', content:'🔹 <strong>a</strong> → antes de sonido consonante: <em>a cat, a book, a university</em><br>🔹 <strong>an</strong> → antes de sonido vocal: <em>an apple, an egg, an hour</em><br>🔹 <strong>the</strong> → cosa única, ya conocida o específica: <em>the sun, the president</em>'}, {title:'🗣️ Ejemplos con contexto', content:'<div class="lesson-example">🐱 I have <strong>a</strong> cat. → Un gato cualquiera (primero que lo menciono).</div><div class="lesson-example">🍎 She eats <strong>an</strong> apple. → "apple" empieza por vocal.</div><div class="lesson-example">☀️ <strong>The</strong> sky is blue. → Solo hay un cielo.</div><div class="lesson-example">🏛️ <strong>The</strong> president spoke. → El presidente (se sabe cuál).</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 El <strong>sonido</strong> importa, no la letra: "an hour" porque "hour" suena como "aur" (vocal). "a university" porque suena "yuniversity" (consonante).</div>'}, ]}, 4: { hero:{icon:'📦', title:'Plural', sub:'Singular → Plural'}, rules:[ {title:'📌 Las reglas del plural', content:'➕ <strong>Regla general:</strong> añade <strong>-s</strong> → cat → cat<strong>s</strong><br>➕ <strong>Palabras en -s, -sh, -ch, -x, -z:</strong> añade <strong>-es</strong> → bus → bus<strong>es</strong>, watch → watch<strong>es</strong><br>🔄 <strong>Irregulares:</strong><br>&nbsp;&nbsp;child → <strong>children</strong><br>&nbsp;&nbsp;foot → <strong>feet</strong><br>&nbsp;&nbsp;man → <strong>men</strong><br>&nbsp;&nbsp;woman → <strong>women</strong><br>&nbsp;&nbsp;tooth → <strong>teeth</strong>'}, {title:'🗣️ Ejemplos', content:'<div class="lesson-example">🐱 two cat<strong>s</strong>, three book<strong>s</strong>, many dog<strong>s</strong></div><div class="lesson-example">🚌 three bus<strong>es</strong>, two watch<strong>es</strong>, five box<strong>es</strong></div><div class="lesson-example">👨 the <strong>men</strong>, the <strong>women</strong>, the <strong>children</strong></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Los irregulares más comunes son los que más vas a usar. Memoriza: <strong>child→children, man→men, foot→feet</strong>. El resto con -s/-es.</div>'}, ]}, 5: { hero:{icon:'🔄', title:'Present Continuous', sub:'am/is/are + verbo-ing'}, rules:[ {title:'📌 ¿Para qué sirve?', content:'Describe acciones que <strong>están ocurriendo ahora mismo</strong> o que son temporales.<br><br>🏗️ <strong>Estructura:</strong> <em>am / is / are + verbo<strong>-ing</strong></em><br><br>👤 I <strong>am</strong> eat<strong>ing</strong>. · 👩 She <strong>is</strong> run<strong>ning</strong>. · 👥 We <strong>are</strong> talk<strong>ing</strong>.'}, {title:'🔧 Cómo formar el -ing', content:'<div class="lesson-example">📏 Normal: add -ing → eat → eat<strong>ing</strong>, sleep → sleep<strong>ing</strong></div><div class="lesson-example">⚡ Consonante final doble: run → run<strong>n</strong>ing, sit → sit<strong>t</strong>ing</div><div class="lesson-example">✂️ -e final desaparece: make → mak<strong>ing</strong>, write → writ<strong>ing</strong></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Si alguien te pregunta "¿qué estás haciendo ahora?", la respuesta siempre lleva <strong>am/is/are + -ing</strong>. ¡Es el tiempo del momento presente en acción!</div>'}, ]}, '1b': { hero:{icon:'👑', title:'JEFE — Mundo 1', sub:'Todo combinado'}, rules:[ {title:'✅ Repaso express', content:'🌱 <strong>To Be:</strong> I am / She is / They are<br>👤 <strong>Pronombres:</strong> I, You, He, She, It, We, They<br>📖 <strong>Artículos:</strong> a (consonante) / an (vocal) / the (único/conocido)<br>📦 <strong>Plural:</strong> -s, -es, irregulares<br>🔄 <strong>Continuous:</strong> am/is/are + verbo-ing'}, {title:'💡 Estrategia para el jefe', content:'<div class="lesson-tip">👑 Lee <em>toda</em> la oración antes de elegir. El contexto siempre revela cuál regla aplica. Si ves -ing, busca am/is/are. Si ves He/She, busca is o -s.</div>'}, ]}, 6: { hero:{icon:'👋', title:'Saludos', sub:'Hello, Good morning, See you!'}, rules:[ {title:'📌 Saludos por hora del día', content:'☀️ <strong>Good morning</strong> → buenos días (hasta mediodía)<br>🌤️ <strong>Good afternoon</strong> → buenas tardes (12–6 pm)<br>🌙 <strong>Good evening</strong> → buenas tardes/noches (desde 6 pm)<br>😴 <strong>Good night</strong> → solo para despedirse al dormir<br>👋 <strong>Hi / Hey</strong> → hola informal'}, {title:'🗣️ Respuestas naturales', content:'<div class="lesson-example">❓ How are you? → <strong>I\'m fine, thanks!</strong> / <strong>Pretty good!</strong></div><div class="lesson-example">❓ What\'s up? → <strong>Not much!</strong> / <strong>All good!</strong></div><div class="lesson-example">👋 Goodbye! → <strong>See you later!</strong> / <strong>Take care!</strong></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"See you later"</strong> es la despedida más usada y versátil. Funciona con cualquier persona en cualquier contexto informal.</div>'}, ]}, 7: { hero:{icon:'🙋', title:'Presentarse', sub:'My name is... I am from...'}, rules:[ {title:'📌 Las frases esenciales', content:'🏷️ <strong>My name is...</strong> → Me llamo...<br>🌍 <strong>I am from...</strong> → Soy de...<br>🎂 <strong>I am X years old.</strong> → Tengo X años.<br>💼 <strong>I work as...</strong> → Trabajo como...<br>🤝 <strong>Nice to meet you!</strong> → ¡Encantado/a!'}, {title:'🗣️ Presentación completa', content:'<div class="lesson-example">👋 Hi! <strong>My name is</strong> Ana. <strong>I\'m from</strong> Colombia. <strong>I\'m</strong> 28 <strong>years old</strong>. <strong>I work as</strong> a teacher. <strong>Nice to meet you!</strong></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 En inglés la <strong>edad usa "to be"</strong>: I <strong>am</strong> 25, NO "I have 25 years". Este es el error #1 de hispanohablantes.</div>'}, ]}, 8: { hero:{icon:'❓', title:'Preguntar nombres', sub:'What\'s your name? Where are you from?'}, rules:[ {title:'📌 Las 4 preguntas esenciales', content:'🏷️ <strong>What\'s your name?</strong> → ¿Cómo te llamas?<br>🌍 <strong>Where are you from?</strong> → ¿De dónde eres?<br>🎂 <strong>How old are you?</strong> → ¿Cuántos años tienes?<br>💼 <strong>What do you do?</strong> → ¿En qué trabajas?'}, {title:'🗣️ Mini diálogo real', content:'<div class="lesson-example">👋 A: <em>Hi! What\'s your name?</em></div><div class="lesson-example">😊 B: <em>I\'m Carlos. Where are you from?</em></div><div class="lesson-example">🌎 A: <em>I\'m from Mexico. How old are you?</em></div><div class="lesson-example">🎂 B: <em>I\'m 30. What do you do?</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"What do you do?"</strong> literalmente es "¿qué haces?" pero en inglés siempre pregunta la <strong>profesión</strong>. Para preguntar actividad actual, di "What are you doing?"</div>'}, ]}, 9: { hero:{icon:'❤️', title:'Gustos', sub:'I like / I love / I hate'}, rules:[ {title:'📌 Expresar gustos con intensidad', content:'💚 <strong>I like</strong> → me gusta<br>❤️ <strong>I love</strong> → me encanta<br>😐 <strong>I don\'t mind</strong> → no me importa / me da igual<br>😒 <strong>I don\'t like</strong> → no me gusta<br>❌ <strong>I hate</strong> → odio<br><br>⚠️ Con <strong>He/She</strong>: <em>She <strong>likes</strong></em>, <em>He <strong>loves</strong></em> (añade -s)'}, {title:'🗣️ Con verbos (-ing)', content:'<div class="lesson-example">⚽ I <strong>like</strong> playing football.</div><div class="lesson-example">🎬 She <strong>loves</strong> watching movies.</div><div class="lesson-example">☕ I <strong>don\'t like</strong> drinking coffee.</div><div class="lesson-example">🌧️ He <strong>hates</strong> getting wet.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Like/love/hate con <strong>-ing</strong> del verbo. "I love watch movies" ❌ → "I love watch<strong>ing</strong> movies" ✅. Siempre gerundio después.</div>'}, ]}, 10: { hero:{icon:'💬', title:'Small Talk', sub:'Conversación casual — el arma social'}, rules:[ {title:'📌 Frases de pequeña charla', content:'🌤️ <strong>What\'s the weather like?</strong> → ¿Qué tiempo hace?<br>☀️ <strong>It\'s hot / cold / rainy today.</strong><br>🚶 <strong>Where are you going?</strong> → ¿Adónde vas?<br>😮 <strong>How interesting!</strong> → ¡Qué interesante!<br>👍 <strong>Sounds good!</strong> → ¡Suena bien!'}, {title:'🗣️ Respuestas naturales', content:'<div class="lesson-example">🌤️ "What\'s the weather like?" → <strong>"It\'s sunny and warm!"</strong></div><div class="lesson-example">🚶 "Where are you going?" → <strong>"I\'m heading to work."</strong></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Para el tiempo atmosférico, el sujeto siempre es <strong>"It"</strong>: It\'s raining. It\'s cold. Nunca "The weather is raining".</div>'}, ]}, '2b': { hero:{icon:'👑', title:'JEFE — Mundo 2', sub:'Mantén una conversación real'}, rules:[ {title:'✅ Repaso express', content:'👋 <strong>Saludos:</strong> Good morning/afternoon · Hi · See you<br>🙋 <strong>Presentarse:</strong> name, age (to be!), job, country<br>❓ <strong>Preguntar:</strong> What\'s / Where / How old / What do you do<br>❤️ <strong>Gustos:</strong> like/love/hate + -ing'}, {title:'💡 Estrategia', content:'<div class="lesson-tip">👑 Lee el contexto de cada intercambio. ¿Es un saludo? ¿Una pregunta? ¿Una respuesta? Responde como lo haría una persona real.</div>'}, ]}, 11: { hero:{icon:'🏠', title:'La casa', sub:'Rooms, furniture & objects'}, rules:[ {title:'📌 Cuartos de la casa', content:'🍳 <strong>kitchen</strong> → cocina<br>🚿 <strong>bathroom</strong> → cuarto de baño<br>🛋️ <strong>living room</strong> → salón / sala<br>🛏️ <strong>bedroom</strong> → dormitorio<br>🍽️ <strong>dining room</strong> → comedor<br>🏡 <strong>garden / backyard</strong> → jardín'}, {title:'🗣️ Frases útiles', content:'<div class="lesson-example">🍳 <em>The kitchen is big.</em> → La cocina es grande.</div><div class="lesson-example">🛋️ <em>I watch TV in the living room.</em></div><div class="lesson-example">🚿 <em>I shower in the bathroom.</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Living room"</strong> = dos palabras separadas. <strong>"Bedroom"</strong> = una sola palabra. <strong>"Bathroom"</strong> = una sola. ¡Cuidado con los espacios!</div>'}, ]}, 12: { hero:{icon:'🍽️', title:'Comida', sub:'Food, drinks & meals'}, rules:[ {title:'📌 Las tres comidas del día', content:'🌅 <strong>breakfast</strong> → desayuno (mañana)<br>☀️ <strong>lunch</strong> → almuerzo (mediodía)<br>🌙 <strong>dinner</strong> → cena (noche)<br><br>😋 <strong>hungry</strong> → con hambre<br>💧 <strong>thirsty</strong> → con sed<br>😊 <strong>full</strong> → lleno/satisfecho'}, {title:'🗣️ En el restaurante', content:'<div class="lesson-example">🍽️ "Can I have the <strong>bill</strong>?" (UK) = "Can I have the <strong>check</strong>?" (US)</div><div class="lesson-example">🥤 "Something to <strong>drink</strong>?" → ¿Algo para beber?</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>Bill</strong> (UK) = <strong>check</strong> (US) = la cuenta. Ambas son correctas. Para pedir: <em>"Can I have..."</em> o <em>"I\'d like..."</em> — son más educadas que "I want".</div>'}, ]}, 13: { hero:{icon:'⏰', title:'Rutina diaria', sub:'Phrasal verbs del día a día'}, rules:[ {title:'📌 Los phrasal verbs de rutina', content:'⏰ <strong>wake up</strong> → despertarse<br>🚿 <strong>take a shower</strong> → ducharse<br>🍳 <strong>have breakfast</strong> → desayunar<br>🚌 <strong>go to work</strong> → ir al trabajo<br>🏠 <strong>get home</strong> → llegar a casa<br>😴 <strong>go to bed</strong> → acostarse'}, {title:'🗣️ Una rutina completa', content:'<div class="lesson-example">⏰ I <strong>wake up</strong> at 7. I <strong>take a shower</strong> and <strong>have breakfast</strong>.</div><div class="lesson-example">🚌 I <strong>go to work</strong> by subway. I <strong>get home</strong> at 6 pm.</div><div class="lesson-example">😴 I <strong>go to bed</strong> at 11 pm.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Go to work/school/bed"</strong> → SIN artículo. Pero: <strong>"Go to the hospital/office/store"</strong> → CON "the". Memoriza los sin artículo: work, school, bed, home.</div>'}, ]}, 14: { hero:{icon:'🌤️', title:'El tiempo', sub:'Weather & seasons'}, rules:[ {title:'📌 Cómo describir el tiempo', content:'☀️ <strong>sunny</strong> → soleado &nbsp;|&nbsp; 🌧️ <strong>rainy</strong> → lluvioso<br>❄️ <strong>cold</strong> → frío &nbsp;|&nbsp; 🌡️ <strong>hot</strong> → caluroso<br>💨 <strong>windy</strong> → ventoso &nbsp;|&nbsp; ☁️ <strong>cloudy</strong> → nublado<br>🌫️ <strong>foggy</strong> → con niebla<br><br>🔧 <strong>Regla:</strong> sustantivo + <strong>-y</strong> = adjetivo (fog→foggy, rain→rainy)'}, {title:'🗣️ Frases del tiempo', content:'<div class="lesson-example">☀️ <em>It\'s sunny today.</em> → Hoy está soleado.</div><div class="lesson-example">🌧️ <em>It\'s raining.</em> → Está lloviendo.</div><div class="lesson-example">❄️ <em>It\'s very cold in winter.</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 El sujeto del tiempo <strong>SIEMPRE es "It"</strong>. Nunca "The weather is raining" ❌. Siempre <strong>"It\'s raining"</strong> ✅. Es una regla fija del inglés.</div>'}, ]}, 15: { hero:{icon:'🗺️', title:'Direcciones', sub:'Getting around the city'}, rules:[ {title:'📌 Las instrucciones clave', content:'⬅️ <strong>Turn left</strong> → gira a la izquierda<br>➡️ <strong>Turn right</strong> → gira a la derecha<br>⬆️ <strong>Go straight ahead</strong> → sigue recto<br>🏙️ <strong>Two blocks away</strong> → a dos manzanas<br>📍 <strong>On the corner of</strong> → en la esquina de<br>🔄 <strong>Take the first/second left</strong> → toma la primera/segunda a la izquierda'}, {title:'🗣️ Dando instrucciones', content:'<div class="lesson-example">🗺️ <em>Go straight ahead, then turn left at the traffic light.</em></div><div class="lesson-example">📍 <em>It\'s two blocks away, on the right.</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Block"</strong> = manzana (cuadra de ciudad). "Two blocks from here" = a dos manzanas. Es muy diferente a "block" en otros contextos.</div>'}, ]}, '3b': { hero:{icon:'👑', title:'JEFE — Mundo 3', sub:'Narra tu día completo'}, rules:[ {title:'✅ Repaso express', content:'🏠 <strong>Rooms:</strong> kitchen, bathroom, living room, bedroom<br>🍽️ <strong>Meals:</strong> breakfast / lunch / dinner<br>⏰ <strong>Rutina:</strong> wake up, take a shower, go to bed<br>🌤️ <strong>Tiempo:</strong> It\'s sunny/rainy/cold — It siempre<br>🗺️ <strong>Direcciones:</strong> left/right, straight ahead, blocks'}, {title:'💡 Estrategia', content:'<div class="lesson-tip">👑 Combina lo que sabes. Lee el contexto de la oración antes de elegir. Los phrasal verbs son bloques fijos — no los traduzcas palabra por palabra.</div>'}, ]}, 16: { hero:{icon:'🧠', title:'Present Simple', sub:'Hábitos, rutinas y verdades'}, rules:[ {title:'📌 ¿Cuándo se usa?', content:'Para hábitos, rutinas y verdades universales:<br><br>✅ I <strong>work</strong> every day. → trabajo todos los días<br>✅ The sun <strong>rises</strong> in the east. → verdad universal<br>✅ She <strong>drinks</strong> coffee every morning. → hábito<br><br>⚠️ <strong>Regla del -s:</strong> con <strong>He / She / It</strong> el verbo añade -s:<br>&nbsp;&nbsp;I work → She work<strong>s</strong> · You leave → The train leave<strong>s</strong>'}, {title:'❌ Negativo e ❓ interrogativo', content:'<div class="lesson-example">❌ <strong>I/You/We/They:</strong> I <strong>don\'t</strong> like it. / Do you like it?</div><div class="lesson-example">❌ <strong>He/She/It:</strong> She <strong>doesn\'t</strong> work. / Does she work?</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Con <strong>does/doesn\'t</strong>, el verbo <strong>vuelve a la base</strong>: "She doesn\'t <strong>work</strong>" ✅ — nunca "She doesn\'t works" ❌. El -s ya está en el auxiliar.</div>'}, ]}, 17: { hero:{icon:'🔍', title:'Do / Does', sub:'El auxiliar de preguntas y negaciones'}, rules:[ {title:'📌 Do vs Does — la regla', content:'🔹 <strong>DO</strong> → con I, You, We, They<br>🔹 <strong>DOES</strong> → con He, She, It<br><br>❓ <strong>Preguntas:</strong> Do / Does + sujeto + verbo base?<br><div style="margin-top:8px">Do <em>you</em> like music? → ¿Te gusta la música?<br>Does <em>she</em> have a car? → ¿Tiene carro?</div>'}, {title:'❌ Negaciones', content:'<div class="lesson-example">👤 I / You / We / They → <strong>don\'t</strong> + verbo: I <strong>don\'t</strong> understand.</div><div class="lesson-example">👩 He / She / It → <strong>doesn\'t</strong> + verbo: She <strong>doesn\'t</strong> have a car.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Después de <strong>does/doesn\'t</strong> el verbo SIEMPRE va en forma base (sin -s). "Does she <strong>work</strong>?" ✅ — "Does she works?" ❌. El auxiliar lleva el trabajo.</div>'}, ]}, 18: { hero:{icon:'❓', title:'Wh- Questions', sub:'What, Where, When, Who, Why, How'}, rules:[ {title:'📌 Las 6 palabras mágicas', content:'🔹 <strong>What</strong> → ¿qué? / ¿cuál? — <em>What is your name?</em><br>🔹 <strong>Where</strong> → ¿dónde? — <em>Where do you live?</em><br>🔹 <strong>When</strong> → ¿cuándo? — <em>When does it start?</em><br>🔹 <strong>Who</strong> → ¿quién? — <em>Who called you?</em><br>🔹 <strong>Why</strong> → ¿por qué? — <em>Why are you late?</em><br>🔹 <strong>How</strong> → ¿cómo? — <em>How are you?</em>'}, {title:'🔧 Combos útiles', content:'<div class="lesson-example">⏰ <strong>What time</strong> → ¿A qué hora? — What time is it?</div><div class="lesson-example">📏 <strong>How long</strong> → ¿Cuánto tiempo? — How long does it take?</div><div class="lesson-example">💰 <strong>How much</strong> → ¿Cuánto cuesta? — How much is it?</div><div class="lesson-example">🔢 <strong>How many</strong> → ¿Cuántos? — How many people?</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 "What\'s her <strong>name</strong>?" ✅ — no "How is her name?" ❌. En inglés el nombre se pregunta con <strong>What</strong>. La edad también: "How <strong>old</strong> are you?" (How + adjetivo).</div>'}, ]}, 19: { hero:{icon:'🚫', title:'Negaciones', sub:'No, not, never, don\'t...'}, rules:[ {title:'📌 Las formas de negar', content:'❌ <strong>don\'t / doesn\'t</strong> → niega verbos normales<br>&nbsp;&nbsp;I <strong>don\'t</strong> eat meat. / She <strong>doesn\'t</strong> know.<br><br>❌ <strong>isn\'t / aren\'t / wasn\'t</strong> → niega to be<br>&nbsp;&nbsp;He <strong>isn\'t</strong> here. / They <strong>aren\'t</strong> ready.<br><br>🚫 <strong>never</strong> → nunca (con verbo afirmativo)<br>&nbsp;&nbsp;I <strong>never</strong> eat fast food.'}, {title:'🗣️ Ejemplos claros', content:'<div class="lesson-example">🥩 I <strong>don\'t</strong> eat meat. → No como carne.</div><div class="lesson-example">🏠 She <strong>isn\'t</strong> at home. → No está en casa.</div><div class="lesson-example">🚫 I <strong>never</strong> wake up late. → Nunca me despierto tarde.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 ¡Nunca dobles negativos en inglés! "I <strong>never</strong> eat <del>nothing</del>" ❌ → "I never eat <strong>anything</strong>" ✅. "Never" ya es negativo — no necesita "not" ni "nothing".</div>'}, ]}, 20: { hero:{icon:'⏱️', title:'Adverbios de frecuencia', sub:'Always, usually, sometimes, never...'}, rules:[ {title:'📌 De más a menos frecuencia', content:'🔝 <strong>always</strong> → siempre (100%)<br>📈 <strong>usually</strong> → normalmente (80%)<br>📊 <strong>often</strong> → frecuentemente (60%)<br>📉 <strong>sometimes</strong> → a veces (40%)<br>🔻 <strong>rarely</strong> → rara vez (20%)<br>⬇️ <strong>never</strong> → nunca (0%)'}, {title:'📍 ¿Dónde van?', content:'<div class="lesson-example">✅ <strong>ANTES</strong> del verbo principal: She <strong>always</strong> arrives on time.</div><div class="lesson-example">✅ <strong>DESPUÉS</strong> del "to be": He <strong>is</strong> always late.</div><div class="lesson-example">✅ Al inicio de frase: <strong>Sometimes</strong> I go to the gym.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Regla de oro: van <strong>ANTES del verbo</strong> principal pero <strong>DESPUÉS de to be</strong>. "She always <strong>works</strong> hard" ✅ · "She is always <strong>tired</strong>" ✅</div>'}, ]}, '4b': { hero:{icon:'👑', title:'JEFE — Mundo 4', sub:'Detecta los errores gramaticales'}, rules:[ {title:'✅ Repaso express', content:'🧠 <strong>Present Simple:</strong> -s con He/She/It<br>🔍 <strong>Do/Does:</strong> do para I/You/We/They, does para He/She/It<br>❓ <strong>Wh-:</strong> What/Where/When/Who/Why/How<br>🚫 <strong>Negaciones:</strong> don\'t/doesn\'t + verbo base<br>⏱️ <strong>Frecuencia:</strong> always/usually/often/sometimes/never'}, {title:'💡 Estrategia', content:'<div class="lesson-tip">👑 En el jefe, busca el error. Mentalmente di la oración en voz alta. La opción que "suene rara" probablemente está mal. Aplica las reglas una a una.</div>'}, ]}, 21: { hero:{icon:'🗣️', title:'Contracciones', sub:'Habla como un nativo'}, rules:[ {title:'📌 Las contracciones más usadas', content:'👤 I am → <strong>I\'m</strong> &nbsp;|&nbsp; You are → <strong>You\'re</strong><br>👩 He is → <strong>He\'s</strong> &nbsp;|&nbsp; She is → <strong>She\'s</strong><br>👥 We are → <strong>We\'re</strong> &nbsp;|&nbsp; They are → <strong>They\'re</strong><br><br>❌ <strong>Negaciones:</strong><br>is not → <strong>isn\'t</strong> · are not → <strong>aren\'t</strong><br>do not → <strong>don\'t</strong> · does not → <strong>doesn\'t</strong><br>will not → <strong>won\'t</strong>'}, {title:'🗣️ Con y sin contracción', content:'<div class="lesson-example">😐 Formal: <em>I am going to the store.</em></div><div class="lesson-example">😊 Natural: <em>I\'m going to the store.</em></div><div class="lesson-example">😐 Formal: <em>She does not want to come.</em></div><div class="lesson-example">😊 Natural: <em>She doesn\'t want to come.</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Sin contracciones suenas muy formal — como leyendo un libro. Con contracciones suenas natural. Los nativos usan contracciones <strong>casi siempre</strong> al hablar.</div>'}, ]}, 22: { hero:{icon:'💬', title:'Expresiones comunes', sub:'Chunks del inglés real'}, rules:[ {title:'📌 Expresiones que debes conocer', content:'🤷 <strong>Whatever</strong> → lo que sea / me da igual<br>✅ <strong>Of course!</strong> → ¡Por supuesto!<br>🎯 <strong>More or less</strong> → más o menos<br>😤 <strong>No way!</strong> → ¡Ni hablar! / ¡Imposible!<br>💪 <strong>Work out</strong> → funcionar / resultar bien<br>🤔 <strong>I guess</strong> → supongo<br>😮 <strong>That\'s crazy!</strong> → ¡Qué locura!'}, {title:'🗣️ En contexto', content:'<div class="lesson-example">❓ "Do you want pizza?" → "Of course! I love pizza!"</div><div class="lesson-example">😤 "Can we finish in 5 min?" → "No way! It\'ll take an hour."</div><div class="lesson-example">🤷 "What do you want to eat?" → "Whatever you prefer!"</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Estas son <strong>"chunks"</strong> (bloques). Apréndelas como unidades completas — no las traduzcas palabra por palabra. "No way" no es "ningún camino".</div>'}, ]}, 23: { hero:{icon:'☕', title:'Small Talk', sub:'El arte de la charla casual'}, rules:[ {title:'📌 Frases para conectar', content:'👍 <strong>Sounds good!</strong> → ¡Suena bien!<br>🤔 <strong>I think so.</strong> → Creo que sí.<br>😮 <strong>Really?</strong> → ¿En serio?<br>😊 <strong>That\'s great!</strong> → ¡Qué bien!<br>📅 <strong>What are your plans?</strong> → ¿Qué planes tienes?<br>🌤️ <strong>Lovely weather, isn\'t it?</strong> → Buen tiempo, ¿verdad?'}, {title:'🗣️ Flujo natural', content:'<div class="lesson-example">💬 A: "I\'m going to the beach this weekend."</div><div class="lesson-example">😊 B: "Sounds great! I think the weather\'s going to be perfect."</div><div class="lesson-example">😮 A: "Really? I hope so!"</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Sounds good/great/fun"</strong> es la respuesta más natural para aceptar o reaccionar a planes. Úsala constantemente — los nativos la dicen decenas de veces al día.</div>'}, ]}, 24: { hero:{icon:'💭', title:'Opiniones', sub:'Expresar lo que piensas'}, rules:[ {title:'📌 Cómo dar tu opinión', content:'💭 <strong>I think (that)...</strong> → Creo que...<br>❤️ <strong>I feel (that)...</strong> → Siento / creo que...<br>🧠 <strong>I believe (that)...</strong> → Creo / considero que...<br>👤 <strong>In my opinion...</strong> → En mi opinión...<br>👤 <strong>For me / Personally...</strong> → Para mí / Personalmente...<br>🤔 <strong>I\'m not sure, but...</strong> → No estoy seguro/a, pero...'}, {title:'🗣️ Opiniones reales', content:'<div class="lesson-example">💭 <em>I think English is easier than people say.</em></div><div class="lesson-example">👤 <em>In my opinion, practice is more important than theory.</em></div><div class="lesson-example">🤔 <em>I\'m not sure, but I think it\'s on the left.</em></div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>I think, I feel, I believe</strong> son casi intercambiables. Comienza con "I think" — es la más natural, frecuente y versátil en cualquier conversación.</div>'}, ]}, 25: { hero:{icon:'😮', title:'Reacciones', sub:'Respuestas naturales y espontáneas'}, rules:[ {title:'📌 El vocabulario de las reacciones', content:'😮 <strong>Really?!</strong> → ¿En serio?<br>🤩 <strong>That\'s amazing!</strong> → ¡Increíble!<br>😢 <strong>I\'m sorry to hear that.</strong> → Lo siento.<br>😂 <strong>That\'s hilarious!</strong> → ¡Qué gracioso!<br>😤 <strong>That\'s not fair!</strong> → ¡Eso no es justo!<br>🙌 <strong>Good for you!</strong> → ¡Qué bien por ti!<br>🤝 <strong>You\'re welcome.</strong> → De nada.'}, {title:'🗣️ En conversación', content:'<div class="lesson-example">📢 "I got the job!" → "That\'s amazing! Good for you!"</div><div class="lesson-example">😢 "I failed the test." → "I\'m sorry to hear that."</div><div class="lesson-example">😂 "He fell into the pool!" → "That\'s hilarious!"</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"I knew it!"</strong> → usa "it", NO "so". "I knew so" ❌ → "I knew it!" ✅. Aprende las reacciones en bloques — son respuestas automáticas que los nativos no construyen, simplemente recuerdan.</div>'}, ]}, '5b': { hero:{icon:'👑', title:'JEFE — Mundo 5', sub:'Conversación real'}, rules:[ {title:'✅ Repaso express', content:'🗣️ <strong>Contracciones:</strong> I\'m, He\'s, We\'re, don\'t, won\'t<br>💬 <strong>Expresiones:</strong> Of course, No way, Whatever, I guess<br>☕ <strong>Small talk:</strong> Sounds good, Really?, I think so<br>💭 <strong>Opiniones:</strong> I think, In my opinion, For me<br>😮 <strong>Reacciones:</strong> Amazing!, Sorry to hear that, Good for you!'}, {title:'💡 Estrategia', content:'<div class="lesson-tip">👑 Lee el contexto de cada situación. ¿Qué reacción es más natural para ESA situación concreta? A veces hay varias opciones correctas — elige la más común.</div>'}, ]}, 26: { hero:{icon:'💼', title:'Trabajo', sub:'Work & office English'}, rules:[ {title:'📌 Vocabulario laboral esencial', content:'🤝 <strong>meeting</strong> → reunión de trabajo<br>⏰ <strong>full-time / part-time</strong> → tiempo completo / parcial<br>💰 <strong>pay raise</strong> → aumento de sueldo<br>🏖️ <strong>on vacation / on holiday</strong> → de vacaciones<br>📋 <strong>deadline</strong> → fecha límite<br>📧 <strong>follow up</strong> → hacer seguimiento'}, {title:'🗣️ Frases en la oficina', content:'<div class="lesson-example">📅 "I have a <strong>meeting</strong> at 3 pm."</div><div class="lesson-example">💰 "I\'m asking for a <strong>pay raise</strong>."</div><div class="lesson-example">🏖️ "She\'s <strong>on vacation</strong> this week."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 ¡Cuidado! <strong>"Reunion"</strong> en inglés = reencuentro de amigos/familia. Una reunión de trabajo siempre es <strong>"meeting"</strong>. Error muy común de hispanohablantes.</div>'}, ]}, 27: { hero:{icon:'📧', title:'Emails profesionales', sub:'Writing clear, formal emails'}, rules:[ {title:'📌 Estructura de un email formal', content:'📬 <strong>Apertura:</strong> Dear Mr./Ms. [apellido],<br>🎯 <strong>Propósito:</strong> I am writing to...<br>📝 <strong>Cuerpo:</strong> Please find attached... / I would like to...<br>🤝 <strong>Cierre:</strong> Kind regards, / Best regards,<br>✍️ <strong>Firma:</strong> Your name + título'}, {title:'🗣️ Frases útiles', content:'<div class="lesson-example">📨 "I am writing to <strong>inform</strong> you that..."</div><div class="lesson-example">📎 "Please find <strong>attached</strong> the document."</div><div class="lesson-example">⏰ "I look forward to <strong>hearing</strong> from you."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 <strong>"Dear"</strong> es formal. <strong>"Hi"</strong> es informal. Para trabajo, usa "Dear" la primera vez. <strong>"Kind regards"</strong> = cierre formal estándar. "Love" y "Cheers" son para amigos.</div>'}, ]}, 28: { hero:{icon:'🎤', title:'Entrevistas', sub:'Job interview English'}, rules:[ {title:'📌 Preguntas frecuentes y cómo responder', content:'💼 <strong>"Tell me about yourself."</strong> → Resume tu trayectoria en 60 seg.<br>💪 <strong>"What are your strengths?"</strong> → Menciona 2-3 habilidades con ejemplos.<br>📈 <strong>"Why do you want this job?"</strong> → Muestra interés genuino en la empresa.<br>🎯 <strong>"Where do you see yourself in 5 years?"</strong> → Habla de crecimiento.'}, {title:'🗣️ Frases para responder', content:'<div class="lesson-example">💼 "I have <strong>experience in</strong> marketing and sales."</div><div class="lesson-example">💪 "My main <strong>strength is</strong> working under pressure."</div><div class="lesson-example">📈 "I\'m really <strong>passionate about</strong> this industry."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Responde "Why do you want this job?" con <strong>pasión</strong>, no con "the salary". Habla de la empresa, el rol, el crecimiento. Los entrevistadores quieren ver motivación real.</div>'}, ]}, 29: { hero:{icon:'📊', title:'Presentaciones', sub:'Conectar y organizar ideas'}, rules:[ {title:'📌 Conectores para presentar', content:'1️⃣ <strong>First of all / To begin with</strong> → Para empezar<br>➕ <strong>Furthermore / In addition</strong> → Además<br>↔️ <strong>On the other hand</strong> → Por otro lado<br>🎯 <strong>As a result / Therefore</strong> → Como resultado<br>✅ <strong>In conclusion / To sum up</strong> → En conclusión'}, {title:'🗣️ Estructura de presentación', content:'<div class="lesson-example">📢 "First of all, let me introduce the main topic."</div><div class="lesson-example">➕ "Furthermore, the data shows that..."</div><div class="lesson-example">✅ "In conclusion, I recommend..."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Los conectores son tu <strong>esqueleto</strong>. Úsalos y sonará que hablas con confianza. "First... furthermore... in conclusion" = presentación profesional automática.</div>'}, ]}, 30: { hero:{icon:'🎯', title:'Persuasión', sub:'Convencer en inglés'}, rules:[ {title:'📌 Técnicas de persuasión', content:'❓ <strong>Don\'t you think that...?</strong> → ¿No crees que...?<br>🤝 <strong>You\'ll agree that...</strong> → Estarás de acuerdo en que...<br>📊 <strong>The evidence shows that...</strong> → La evidencia muestra...<br>💡 <strong>Imagine if...</strong> → Imagina si...<br>✅ <strong>The fact is that...</strong> → El hecho es que...'}, {title:'🗣️ En uso', content:'<div class="lesson-example">❓ "Don\'t you think this is the best option?"</div><div class="lesson-example">🤝 "You\'ll agree that quality matters more than price."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Las preguntas retóricas como <strong>"Don\'t you think...?"</strong> son poderosas: llevan al oyente a asentir antes de que responda. Es la base de la persuasión en inglés corporativo.</div>'}, ]}, '6b': { hero:{icon:'👑', title:'JEFE — Mundo 6', sub:'Simulación profesional'}, rules:[ {title:'✅ Repaso express', content:'💼 <strong>Trabajo:</strong> meeting, deadline, full-time, pay raise<br>📧 <strong>Emails:</strong> Dear + Kind regards · I am writing to...<br>🎤 <strong>Entrevistas:</strong> strengths, experience, passionate about<br>📊 <strong>Conectores:</strong> First, Furthermore, In conclusion<br>🎯 <strong>Persuasión:</strong> Don\'t you think / You\'ll agree'}, {title:'💡 Estrategia', content:'<div class="lesson-tip">👑 Simula situaciones reales. ¿Qué diría un profesional en esta situación? La respuesta correcta es la más natural y apropiada al contexto laboral.</div>'}, ]}, 31: { hero:{icon:'🎬', title:'Series & cultura', sub:'English as spoken on screen'}, rules:[ {title:'📌 Frases icónicas del inglés real', content:'😤 <strong>"You\'ve got to be kidding me!"</strong> → ¿Estás de broma?<br>🤷 <strong>"It\'s not a big deal."</strong> → No es para tanto.<br>💪 <strong>"Keep up the good work!"</strong> → ¡Sigue así!<br>🤐 <strong>"My lips are sealed."</strong> → Mis labios están sellados (no diré nada)<br>😮 <strong>"I can\'t believe it!"</strong> → ¡No me lo puedo creer!'}, {title:'🗣️ Por qué aprenderlas', content:'<div class="lesson-example">📺 Series → vocabulario natural, contracciones, reacciones auténticas.</div><div class="lesson-example">🎯 Los nativos hablan <em>exactamente</em> como en las series. Es el mejor input real.</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Ve series en inglés con <strong>subtítulos en inglés</strong> (no en español). Esto entrena el oído Y la lectura a la vez. Empieza con Friends, The Office o cualquier sitcom.</div>'}, ]}, 32: { hero:{icon:'😄', title:'Humor y sarcasmo', sub:'Wordplay & irony'}, rules:[ {title:'📌 El humor en inglés', content:'😂 <strong>Pun</strong> → juego de palabras con doble sentido<br>🤣 <strong>"That cracked me up!"</strong> → ¡Me partí de risa!<br>😏 <strong>Sarcasm</strong> → decir lo contrario con tono neutro<br>🙃 <strong>"Oh, great."</strong> (tono plano) → ironía total<br>😂 <strong>"You\'re killing me!"</strong> → ¡Me matas! (de la risa)'}, {title:'🗣️ Sarcasmo en acción', content:'<div class="lesson-example">☁️ [Lluvia intensa] → "Oh, lovely weather we\'re having." 😏</div><div class="lesson-example">😫 [Lunes por la mañana] → "Oh great, another Monday." 🙃</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 El sarcasmo inglés es <strong>completamente plano</strong> — sin énfasis, sin tono irónico evidente. Eso es lo que lo hace gracioso. Si exageras el tono, pierde el efecto.</div>'}, ]}, 33: { hero:{icon:'🔀', title:'Idioms', sub:'Expresiones que no se traducen literalmente'}, rules:[ {title:'📌 Idioms esenciales', content:'🎂 <strong>"A piece of cake"</strong> → facilísimo<br>🎯 <strong>"Hit the nail on the head"</strong> → dar en el clavo<br>💰 <strong>"Cost an arm and a leg"</strong> → costar un ojo de la cara<br>🧊 <strong>"Break the ice"</strong> → romper el hielo<br>🛏️ <strong>"Under the weather"</strong> → sentirse mal/enfermo<br>🌙 <strong>"Bite the bullet"</strong> → aguantar, hacer algo difícil'}, {title:'🗣️ En uso real', content:'<div class="lesson-example">😊 "Don\'t worry, this test is <strong>a piece of cake</strong>!"</div><div class="lesson-example">🤒 "I\'m feeling <strong>under the weather</strong> today."</div><div class="lesson-example">😤 "Just <strong>bite the bullet</strong> and do it."</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Los idioms <strong>NUNCA se traducen palabra por palabra</strong>. "Break the ice" no tiene nada que ver con hielo real. Son bloques fijos — apréndelos como una sola unidad de significado.</div>'}, ]}, 34: { hero:{icon:'🌊', title:'Fluidez', sub:'Natural rhythm, flow & reductions'}, rules:[ {title:'📌 Reducciones del inglés hablado', content:'⚡ <strong>Gonna</strong> = going to → I\'m <strong>gonna</strong> call you.<br>⚡ <strong>Wanna</strong> = want to → Do you <strong>wanna</strong> come?<br>⚡ <strong>Gotta</strong> = have got to → I\'ve <strong>gotta</strong> go.<br>⚡ <strong>Kinda</strong> = kind of → It\'s <strong>kinda</strong> hard.<br>⚡ <strong>Lemme</strong> = let me → <strong>Lemme</strong> think.'}, {title:'🗣️ Formal vs Natural', content:'<div class="lesson-example">😐 "I am going to go to the gym." → muy formal</div><div class="lesson-example">😊 "I\'m gonna go to the gym." → natural</div><div class="lesson-example">😐 "Do you want to eat something?" → correcto pero rígido</div><div class="lesson-example">😊 "Wanna grab something to eat?" → así hablan los nativos</div>'}, {title:'💡 Truco', content:'<div class="lesson-tip">🧠 Estas reducciones son del inglés <strong>hablado</strong>. No las uses en emails formales ni escritura profesional. Pero en conversación, usarlas te hace sonar mucho más natural.</div>'}, ]}, 35: { hero:{icon:'🧠', title:'Pensar en inglés', sub:'El nivel final — fluir sin traducir'}, rules:[ {title:'📌 El salto definitivo', content:'🧠 Pensar en inglés = <strong>entender sin pasar por el español</strong>.<br><br>🎯 <strong>On the go</strong> → en movimiento, sin parar<br>💡 <strong>No-brainer</strong> → algo obvio / fácil de decidir<br>😤 <strong>I told you so!</strong> → ¡Te lo dije!<br>🤷 <strong>Whatever works</strong> → lo que funcione<br>🧠 <strong>At the end of the day</strong> → al final del día / en definitiva'}, {title:'🗣️ Cómo llegar a este nivel', content:'<div class="lesson-example">🎬 Consume contenido en inglés diariamente (series, podcasts, YouTube)</div><div class="lesson-example">✍️ Piensa en inglés en situaciones cotidianas: "What do I need from the store?"</div><div class="lesson-example">🗣️ Habla solo en inglés — en la ducha, caminando, cocinando</div>'}, {title:'💡 Mensaje final', content:'<div class="lesson-tip">🧠 Ya no necesitas el español como intermediario. ¡Confía en tu instinto! Si una opción <em>suena</em> correcta, probablemente lo es. Has construido esa intuición con práctica real.</div>'}, ]}, '7b': { hero:{icon:'👑', title:'JEFE FINAL', sub:'El desafío definitivo'}, rules:[ {title:'🏆 Has llegado al final', content:'Este jefe combina <strong>todo</strong> lo aprendido en los 7 mundos:<br><br>🌱 Gramática base · 💬 Conversación · 🏠 Vida diaria<br>🧠 Gramática avanzada · 🗣️ Naturalidad<br>💼 Inglés profesional · 🎬 Dominio total<br><br>Respira. Tienes las herramientas. Úsalas.'}, {title:'💡 Estrategia final', content:'<div class="lesson-tip">🏆 Aplica todo lo que sabes. Lee el contexto completo. Confía en tu instinto — si has llegado aquí, ya tienes un inglés real y sólido. ¡Enhorabuena!</div>'}, ]}, }; function getLessonData(level) { if (LESSONS[level.id]) return LESSONS[level.id]; const name = (level.name||'').toLowerCase(); const sub = (level.sub||'').toLowerCase(); const is = (...kws) => kws.some(k => name.includes(k) || sub.includes(k)); let heroIcon = '📚'; let topicExplain = ''; let tipContent = '🧠 Lee cada opción en voz alta (mentalmente). La que suene más natural generalmente es la correcta. ¡Confía en tu instinto!'; if(is('past simple','past basic','regular past','past action','simple past')){ heroIcon = '⏪'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 ⏪ <b>Past Simple</b> — se usa para hablar de acciones que <b>ya terminaron</b>.<br><br>
 🔧 <b>Cómo formarlo (verbos regulares):</b><br>
 &nbsp;&nbsp;&nbsp;verbo + <b>-ed</b> &nbsp;→&nbsp; <em>walk → walk<b>ed</b></em>, <em>play → play<b>ed</b></em><br><br>
 ⚠️ <b>Irregulares frecuentes:</b><br>
 &nbsp;&nbsp;&nbsp;go → <b>went</b> &nbsp;|&nbsp; have → <b>had</b> &nbsp;|&nbsp; be → <b>was/were</b><br>
 &nbsp;&nbsp;&nbsp;do → <b>did</b> &nbsp;|&nbsp; say → <b>said</b> &nbsp;|&nbsp; see → <b>saw</b><br><br>
 🗓️ <b>Señales de tiempo que indican pasado:</b><br>
 &nbsp;&nbsp;&nbsp;<em>yesterday</em>, <em>last night</em>, <em>in 2020</em>, <em>ago</em><br><br>
 ❌ <b>Negativo:</b> <em>did not (didn't) + verbo base</em><br>
 &nbsp;&nbsp;&nbsp;I <b>didn't go</b> to school. → No fui a la escuela.<br><br>
 ❓ <b>Pregunta:</b> <em>Did + sujeto + verbo base?</em><br>
 &nbsp;&nbsp;&nbsp;<b>Did</b> you eat? → ¿Comiste?
 </div>`; tipContent = '⏪ El verbo <b>did</b> es el auxiliar del pasado. Si ya usas "did", el verbo principal siempre va en su forma base — nunca con -ed.'; } else if(is('future','going to','will')){ heroIcon = '🔮'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 🔮 <b>Futuro en inglés</b> — dos formas principales:<br><br>
 📌 <b>Will</b> → decisiones en el momento, promesas, predicciones<br>
 &nbsp;&nbsp;&nbsp;I <b>will call</b> you later. → Te llamaré más tarde.<br><br>
 📌 <b>Going to</b> → planes ya decididos, intenciones<br>
 &nbsp;&nbsp;&nbsp;She <b>is going to</b> study tonight. → Va a estudiar esta noche.<br><br>
 🧩 <b>Estructura will:</b> sujeto + <b>will</b> + verbo base<br>
 🧩 <b>Estructura going to:</b> am/is/are + <b>going to</b> + verbo base<br><br>
 ❌ <b>Negativo will:</b> won't (will not)<br>
 ❌ <b>Negativo going to:</b> isn't / aren't going to
 </div>`; tipContent = '🔮 <b>Will</b> = decisiones espontáneas. <b>Going to</b> = planes ya hechos. Ambos hablan del futuro pero con matices distintos.'; } else if(is('present perfect','have been','has been')){ heroIcon = '🔗'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 🔗 <b>Present Perfect</b> — conecta el pasado con el presente.<br><br>
 🏗️ <b>Estructura:</b> <em>have/has + participio pasado</em><br>
 &nbsp;&nbsp;&nbsp;I <b>have eaten</b>. → He comido. (y sigo aquí)<br>
 &nbsp;&nbsp;&nbsp;She <b>has lived</b> here for 5 years. → Lleva 5 años.<br><br>
 📅 <b>Palabras clave:</b><br>
 &nbsp;&nbsp;&nbsp;<em>already, yet, just, ever, never, since, for</em><br><br>
 🔄 <b>Participios irregulares:</b><br>
 &nbsp;&nbsp;&nbsp;go → <b>gone</b>, see → <b>seen</b>, eat → <b>eaten</b>, do → <b>done</b><br><br>
 ❌ <b>Negativo:</b> haven't / hasn't + participio
 </div>`; tipContent = '🔗 Present Perfect ≠ pasado simple. "I have seen" = lo he visto (relevante ahora). "I saw" = lo vi (momento específico terminado).'; } else if(is('conditional','if clause','would')){ heroIcon = '🌀'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 🌀 <b>Condicionales</b> — frases de "si... entonces..."<br><br>
 1️⃣ <b>Zero conditional</b> — hechos/verdades universales<br>
 &nbsp;&nbsp;&nbsp;<em>If you heat water, it boils.</em><br><br>
 2️⃣ <b>First conditional</b> — situaciones posibles/reales<br>
 &nbsp;&nbsp;&nbsp;<em>If it rains, I <b>will</b> stay home.</em><br><br>
 3️⃣ <b>Second conditional</b> — situaciones hipotéticas<br>
 &nbsp;&nbsp;&nbsp;<em>If I <b>had</b> money, I <b>would</b> travel.</em><br><br>
 🔑 <b>Clave:</b> la cláusula "if" y la cláusula resultado pueden ir en cualquier orden.
 </div>`; tipContent = '🌀 Para el 1st conditional: "If + present simple, will + verb base". Para el 2nd: "If + past simple, would + verb base".'; } else if(is('modal','can','could','should','must','may','might')){ heroIcon = '⚙️'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 ⚙️ <b>Verbos modales</b> — añaden matiz a la acción:<br><br>
 ✅ <b>can</b> → capacidad/permiso → I <em>can</em> swim.<br>
 🕰️ <b>could</b> → pasado de can / posibilidad → She <em>could</em> be right.<br>
 💡 <b>should</b> → consejo/recomendación → You <em>should</em> rest.<br>
 🔴 <b>must</b> → obligación fuerte → You <em>must</em> stop.<br>
 🌸 <b>may/might</b> → posibilidad suave → It <em>might</em> rain.<br><br>
 📌 <b>Regla de oro:</b> modal + verbo base (sin "to" ni -s ni -ed)
 </div>`; tipContent = '⚙️ Los modales NUNCA llevan -s en 3ª persona: "she <b>can</b> swim" ✅ — "she <b>cans</b> swim" ❌'; } else if(is('passive','passive voice')){ heroIcon = '🔃'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 🔃 <b>Voz pasiva</b> — el sujeto recibe la acción.<br><br>
 🏗️ <b>Estructura:</b> <em>am/is/are + participio pasado</em><br>
 &nbsp;&nbsp;&nbsp;The book <b>is written</b> in English.<br>
 &nbsp;&nbsp;&nbsp;The cake <b>was eaten</b> by the kids.<br><br>
 🔄 <b>Cómo transformar activa → pasiva:</b><br>
 &nbsp;&nbsp;&nbsp;Active: Tom <em>writes</em> the report.<br>
 &nbsp;&nbsp;&nbsp;Passive: The report <em>is written</em> by Tom.<br><br>
 📌 El agente (quien hace) va con <b>by</b> — y es opcional.
 </div>`; tipContent = '🔃 Usa pasiva cuando el agente es desconocido, irrelevante, o quieres enfatizar el objeto: "The window was broken" (no importa quién).'; } else if(is('gerund','infinitive','-ing verb')){ heroIcon = '🏃'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 🏃 <b>Gerundio vs Infinitivo</b> — dos formas no personales del verbo:<br><br>
 📌 <b>Gerundio (-ing):</b> funciona como sustantivo<br>
 &nbsp;&nbsp;&nbsp;<em>Swimming</em> is fun. | I enjoy <em>reading</em>.<br><br>
 📌 <b>Infinitivo (to + verb):</b> propósito o intención<br>
 &nbsp;&nbsp;&nbsp;I want <em>to learn</em>. | She decided <em>to go</em>.<br><br>
 ⚡ <b>Verbos que usan gerundio:</b> enjoy, finish, avoid, suggest<br>
 ⚡ <b>Verbos que usan infinitivo:</b> want, need, decide, plan, hope
 </div>`; tipContent = '🏃 Tip rápido: después de preposiciones SIEMPRE va gerundio → "good at <b>swimming</b>", "before <b>eating</b>".'; } else if(is('comparison','comparative','superlative')){ heroIcon = '📊'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 📊 <b>Comparativos y superlativos</b>:<br><br>
 📏 <b>Comparativo</b> (más/menos que):<br>
 &nbsp;&nbsp;&nbsp;Cortos: adj + <b>-er</b> → tall → <em>taller</em><br>
 &nbsp;&nbsp;&nbsp;Largos: <b>more</b> + adj → <em>more beautiful</em><br><br>
 🏆 <b>Superlativo</b> (el más/menos de todos):<br>
 &nbsp;&nbsp;&nbsp;Cortos: the + adj + <b>-est</b> → <em>the tallest</em><br>
 &nbsp;&nbsp;&nbsp;Largos: <b>the most</b> + adj → <em>the most beautiful</em><br><br>
 ⚠️ <b>Irregulares:</b><br>
 &nbsp;&nbsp;&nbsp;good → <em>better</em> → <em>the best</em><br>
 &nbsp;&nbsp;&nbsp;bad → <em>worse</em> → <em>the worst</em></div>`; tipContent = '📊 Regla del pulgar: 1 sílaba → -er / -est. 3+ sílabas → more / the most. 2 sílabas → depende del adjetivo.'; } else if(is('question','wh-','how')){ heroIcon = '❓'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 ❓ <b>Preguntas con Wh-</b> — para pedir información específica:<br><br>
 🔹 <b>What</b> → ¿Qué? / ¿Cuál? → <em>What is your name?</em><br>
 🔹 <b>Where</b> → ¿Dónde? → <em>Where do you live?</em><br>
 🔹 <b>When</b> → ¿Cuándo? → <em>When did you arrive?</em><br>
 🔹 <b>Why</b> → ¿Por qué? → <em>Why are you late?</em><br>
 🔹 <b>Who</b> → ¿Quién? → <em>Who called you?</em><br>
 🔹 <b>How</b> → ¿Cómo? → <em>How are you?</em><br>
 🔹 <b>How much/many</b> → ¿Cuánto/s? → cantidad<br><br>
 🏗️ <b>Orden:</b> Wh- + auxiliar + sujeto + verbo
 </div>`; tipContent = '❓ "What time" = ¿a qué hora?. "How long" = ¿cuánto tiempo?. "How far" = ¿qué tan lejos? Son bloques fijos — apréndelos juntos.'; } else { heroIcon = '📚'; topicExplain = `
 <div style="font-size:15px;line-height:1.9">
 📌 <b>Tema:</b> <em>${level.sub}</em><br><br>
 🧩 En este nivel vas a trabajar con patrones reales del inglés que los nativos usan en su día a día.<br><br>
 🗣️ <b>¿Para qué sirve?</b> Para comunicarte con más naturalidad y confianza en inglés.<br><br>
 🔑 <b>Estrategia:</b> Lee cada oración completa antes de elegir. El contexto siempre da pistas.<br><br>
 ✨ <b>Recuerda:</b> El inglés tiene patrones — una vez que los ves, los reconoces para siempre.
 </div>`; tipContent = '🧠 No adivines — razona. Lee la oración completa, identifica el patrón que conoces, y elige con seguridad.'; } return { hero: { icon: heroIcon, title: level.name, sub: level.sub }, rules: [ { title: '🎯 ¿De qué trata este nivel?', content: topicExplain }, { title: '💡 Truco del nivel', content: `<div class="lesson-tip">${tipContent}</div>` } ] }; } { const today = new Date().toDateString(); if (state.lastPlayed !== today) { const yest = new Date(Date.now()-86400000).toDateString(); if (state.lastPlayed === yest) state.streak = (state.streak||1)+1; else if (state.lastPlayed !== today) state.streak = 1; state.lastPlayed = today; saveState(); } } let currentLevel = null; let currentQIndex = 0; let sessionXp = 0; let sessionCorrect = 0; let answered = false; let sessionCorrectStreak = 0; let sessionWrongStreak = 0; let sessionHadWrong = false; let sessionMaxCorrectStreak = 0; let sessionXpLines = []; function levelKey(level) { return `l_${level.id}`; } function getMedal(level) { return state.medals ? (state.medals[levelKey(level)] || 0) : 0; } function medalForAcc(acc) { return acc === 100 ? 3 : acc >= 80 ? 2 : acc >= 60 ? 1 : 0; } function medalStars(m) { const colors = ['','#cd7f32','#9aa4b2','#f59e0b']; const filled = m; let s = ''; for (let i=1;i<=3;i++) s += `<span style="color:${i<=filled?colors[m]:'#2a2a3e'};font-size:14px">🧠</span>`; return s; } function medalLabel(m) { return ['','🥉 Bronce 🧠','🥈 Plata 🧠🧠','🥇 Oro'][m]; } function medalTip(m, acc) { if (m===3) return `${acc}% de acierto. ¡Nivel dominado!`; if (m===2) return `${acc}% de acierto. Repite para conseguir Oro.`; if (m===1) return `${acc}% de acierto. Repite para mejorar.`; return 'Repite el nivel para ganar una medalla.'; } function totalPhrases() { return Object.keys(state.completed).length * 5; } function isCompleted(level) { return !!state.completed[levelKey(level)]; } function isUnlocked(worldIdx, levelIdx) {
  // Regla única:
  // Mundo 1 siempre abierto.
  // Mundo N se abre completo si el boss del mundo N-1 tiene 3 cerebros.
  worldIdx = Number(worldIdx) || 0;
  if (worldIdx === 0) return true;
  const previousWorld = WORLDS[worldIdx - 1];
  if (!previousWorld || !Array.isArray(previousWorld.levels)) return false;
  const previousBoss = previousWorld.levels.find(level => level && level.boss);
  if (!previousBoss) return false;
  return getMedal(previousBoss) >= 3;
} function worldColor(world) { return world.color; } function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); const el = document.getElementById(id); el.classList.add('active'); el.style.animation = 'none'; el.offsetHeight; el.style.animation = ''; } function spawnXP(amount, refEl) { const el = document.createElement('div'); el.className = 'xp-p'; el.textContent = `+${amount}`; const r = (refEl || document.getElementById('q-xp-live')).getBoundingClientRect(); el.style.left = r.left + 'px'; el.style.top = r.top + 'px'; document.body.appendChild(el); setTimeout(() => el.remove(), 1000); } function goToMap() { SFX.start(); renderMap(); updateAllMascots(); show('screen-map'); } function openDonation() { SFX.click(); alert('¡Gracias por considerar apoyar XP! 💜\n\nEste proyecto es de acceso libre. Si te está ayudando a aprender inglés, una pequeña donación nos permite seguir mejorándolo.\n\n☕ Ko-fi: ko-fi.com/englishxp\n💜 Paypal: paypal.me/englishxp\n\n¡Muchas gracias por llegar hasta aquí!'); } function renderMap() { document.getElementById('total-xp-display').textContent = state.totalXp; const balEl = document.getElementById('xp-balance-display'); if (balEl) balEl.textContent = state.xpBalance; const spentEl = document.getElementById('spent-xp-display'); if (spentEl) spentEl.textContent = state.spentXp; const totalLevels = WORLDS.reduce((s,w) => s + w.levels.length, 0); const completedLevels = WORLDS.reduce((s,w) => s + w.levels.filter(l => isCompleted(l)).length, 0); document.getElementById('xp-bar-fill').style.width = Math.min(100, (completedLevels / totalLevels * 100)) + '%'; document.getElementById('phrases-dominated').textContent = totalPhrases(); const done = Object.keys(state.completed).length; document.getElementById('map-sub').textContent = `${done} nivel${done===1?'':'es'} completado${done===1?'':'s'} · Racha ${state.streak}d 🔥`; const container = document.getElementById('worlds-container'); container.innerHTML = ''; WORLDS.forEach((world, wi) => { const block = document.createElement('div'); const worldLocked = !isUnlocked(wi, 0); block.className = 'world-block' + (worldLocked ? ' locked-world' : ''); block.style.setProperty('--wc', world.color); const allDone = world.levels.every(l => isCompleted(l)); const allGold = !worldLocked && allDone && world.levels.every(l => getMedal(l) === 3); if (allGold) block.classList.add('all-gold'); if (!worldLocked && allDone) block.classList.add('all-done'); const firstIncomplete = wi === WORLDS.findIndex(w => !w.levels.every(l => isCompleted(l))); if (firstIncomplete && !allDone && !worldLocked) block.classList.add('open'); const worldDone = world.levels.filter(l => isCompleted(l)).length; const lockedName = `MUNDO ${world.id} — ${world.name}`; const lockedDesc = worldLocked ? '🔒 Bloqueado' : world.desc; block.innerHTML = `
 <div class="world-header" onclick="${worldLocked ? '' : 'toggleWorld(this)'}"><div class="world-icon" style="${worldLocked ? 'filter:grayscale(.5) opacity(.6)' : ''}">${world.icon}</div><div class="world-info"><div class="world-name" style="color:${allDone ? '#ffe040' : worldLocked ? 'rgba(180,185,220,.55)' : world.color}">${lockedName}</div><div class="world-sub">${worldLocked ? lockedDesc : world.desc + ' · ' + worldDone + '/' + world.levels.length + ' completados'}</div></div>
 ${worldLocked ? '<div class="world-chevron" style="opacity:.4">▼</div>' : '<div class="world-chevron">▼</div>'}
 </div><div class="world-levels"></div>`; const levelsEl = block.querySelector('.world-levels'); const levelsToShow = worldLocked ? [] : world.levels; levelsToShow.forEach((level, liRaw) => { const li = worldLocked ? world.levels.indexOf(level) : liRaw; const unlocked = isUnlocked(wi, li); const done = isCompleted(level); const row = document.createElement('div'); const m = done ? getMedal(level) : 0; row.className = 'level-row' + (level.boss ? ' boss-row' : '') + (done ? ' completed' : '') + (!unlocked ? ' locked' : '') + (m === 3 ? ' gold-mastered' : ''); let badge = ''; if (done) { const med = getMedal(level); badge = `<span class="lv-badge done" style="display:flex;align-items:center;gap:3px">${medalStars(med)}</span>`; } else if (worldLocked) badge = `<span class="lv-badge locked">🔒</span>`; else if (!unlocked) badge = `<span class="lv-badge locked">🔒</span>`; else badge = `<span class="lv-badge ready">▶ Jugar</span>`; row.innerHTML = `
 <div class="lv-num" style="background:${done?'var(--green)':unlocked?world.color:'var(--dim)'}22;color:${done?'var(--green)':unlocked?world.color:'var(--muted)'}">
 ${level.boss ? '👑' : level.id}
 </div><div class="lv-title"><div class="lv-name">${level.name}${worldLocked ? ' <span style="font-size:10px;color:var(--muted)">(Boss)</span>' : ''}</div><div class="lv-sub">${worldLocked ? '' : level.sub}</div></div>
 ${badge}`; if (unlocked || worldLocked) { row.onclick = () => startLevel(level, world); row.style.cursor = 'pointer'; row.classList.remove('locked'); } if (done) { row.onclick = () => startLevel(level, world); row.style.cursor = 'pointer'; } levelsEl.appendChild(row); }); if (worldLocked) { const header = block.querySelector('.world-header'); if (header) { header.style.cursor = 'pointer'; header.onclick = () => block.classList.toggle('open'); const chev = document.createElement('div'); chev.className = 'world-chevron'; chev.textContent = '▼'; header.appendChild(chev); } } container.appendChild(block); }); } function toggleWorld(header) { const block = header.closest('.world-block'); block.classList.toggle('open'); } function startLevel(level, world) { SFX.click(); currentLevel = level; currentWorld = world; currentQIndex = 0; sessionXp = 0; sessionCorrect = 0; sessionCorrectStreak = 0; sessionWrongStreak = 0; sessionHadWrong = false; sessionMaxCorrectStreak = 0; sessionXpLines = []; answered = false; showLesson(level, world); } let currentWorld = null; function showLesson(level, world) { const data = getLessonData(level); document.getElementById('lesson-world-label').textContent = 'MUNDO ' + (world.id) + ' — ' + world.name.toUpperCase(); document.getElementById('lesson-level-title').textContent = level.name; const body = document.getElementById('lesson-body'); let html = `<div class="lesson-hero" style="background:linear-gradient(135deg,${world.color}22,${world.color}08)"><div class="lesson-hero-icon">${data.hero.icon}</div><div class="lesson-hero-title" style="color:${world.color}">${data.hero.title}</div><div class="lesson-hero-sub">${data.hero.sub}</div></div>`; data.rules.forEach(r => { html += `<div class="lesson-rule"><div class="lesson-rule-title">${r.title}</div><div class="lesson-rule-content">${r.content}</div></div>`; }); body.innerHTML = html; updateAllMascots(); show('screen-lesson'); } function beginQuiz() { SFX.start(); document.getElementById('q-prog-fill').style.background = `linear-gradient(90deg, ${currentWorld.color}, ${currentWorld.color}aa)`; const badge = document.getElementById('quiz-streak-counter'); if(badge) badge.style.display = 'none'; show('screen-quiz'); renderQ(); } function exitQuiz() { SFX.click(); if (confirm('¿Salir de la prueba? Perderás el progreso de esta sesión.')) { goToMap(); } } function renderQ() { window.__earnHintFiredThisAnswer = false; const q = currentLevel.qs[currentQIndex]; answered = false; document.getElementById('quiz-label').textContent = `NIVEL ${currentLevel.id} · ${currentQIndex+1}/${currentLevel.qs.length}`; document.getElementById('q-xp-live').textContent = sessionXp; document.getElementById('q-prog-fill').style.width = `${(currentQIndex / currentLevel.qs.length) * 100}%`; document.getElementById('q-flag').textContent = '🇨🇴'; document.getElementById('q-es').textContent = q.es; const parts = q.en.split('___'); document.getElementById('q-en').innerHTML = parts[0] + `<span class="blank" id="blank-span">___</span>` + (parts[1]||''); const optsEl = document.getElementById('q-opts'); optsEl.innerHTML = ''; const letters = ['A','B','C','D']; q.opts.forEach((opt, i) => { const btn = document.createElement('button'); btn.className = 'opt'; btn.innerHTML = `<span class="ol">${letters[i]}</span><span>${opt}</span>`; btn.onclick = () => selectAns(i); optsEl.appendChild(btn); }); document.getElementById('q-fb').className = 'fb-box'; document.getElementById('q-fb').innerHTML = ''; document.getElementById('btn-next').className = 'btn-next'; document.getElementById('btn-next').textContent = currentQIndex < currentLevel.qs.length - 1 ? 'Siguiente →' : 'Ver resultado →'; document.getElementById('quiz-body').scrollTop = 0; } function addSessionXp(amount, label, refEl) { sessionXp += amount; sessionXpLines.push({label, amount}); document.getElementById('q-xp-live').textContent = sessionXp; spawnXP(amount, refEl); setTimeout(() => SFX.xp(), 120); } const EMOTIONAL_MESSAGES = { correct3: ['✨ You’re not guessing anymore. You’re understanding.','⚡ Your brain is already starting to think in English.','🌱 Three steps in a row. That is not luck — that is pattern recognition.'], correct5: ['🔥 Five in a row. Your confidence is becoming evidence.','🏆 Look at that rhythm. Progress is starting to sound like you.','💫 You are building fluency one brave answer at a time.'], wrong2: ['🫂 You are not failing. You are building connections.','🌎 English is not talent. It is exposure and repetition.','💡 Errors are not walls. They are signposts.'], wrong5: ['🌱 Pause, breathe, continue. Progress before perfection.','🧠 Your brain is mapping new roads. Roads are messy before they are smooth.','💜 Knowledge belongs to everyone — including you, especially now.'], recuperación: ['⚡ That recuperación matters. You returned instead of disappearing.','🌤️ See? One clear answer can reopen the sky.','💪 Recovery is a skill too. You just practiced it.'], level: ['🌱 El conocimiento es de todos. Keep going.','💡 Progress matters more than perfection.','🌎 English should feel reachable — and you just reached a little further.'], retry: ['🔁 Repetition is not starting over. It is sharpening.','🧩 Returning to a level means you care about understanding, not pretending.'], shop: ['🛍️ Learning created value. Value became identity.','✨ Your effort just became part of your character.'] }; function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; } function showPhilosophy(type) { const layer = document.getElementById('emotion-layer'); if (!layer || !EMOTIONAL_MESSAGES[type]) return; const card = document.createElement('div'); card.className = 'emotion-card'; card.innerHTML = '<div class="emotion-kicker">XP</div><div class="emotion-msg">'+pick(EMOTIONAL_MESSAGES[type])+'</div>'; layer.appendChild(card); while (layer.children.length > 2) layer.children[0].remove(); setTimeout(() => { card.classList.add('hide'); setTimeout(()=>card.remove(), 320); }, 3600); } function calculateDynamicGain(correct, refEl) { if (!correct) return 0; const worldIdx = WORLDS.indexOf(currentWorld); const diffBase = currentLevel.boss ? 110 : (60 + Math.floor(Math.random() * 52)); let gain = diffBase; let labels = ['Respuesta']; if (currentQIndex === 0) { gain += 10; labels.push('primer intento'); } if (sessionCorrectStreak >= 2) { const bonus = Math.min(54, sessionCorrectStreak * 7); gain += bonus; labels.push('combo x'+(sessionCorrectStreak+1)); } if (sessionHadWrong && sessionWrongStreak === 0) { gain += 27; labels.push('recuperación'); showPhilosophy('recuperación'); sessionHadWrong = false; } if (Math.random() < 0.12) { gain += 18; labels.push('sorpresa ✨'); } addSessionXp(gain, labels.join(' · '), refEl); return gain; } function selectAns(idx) { if (answered) return; answered = true; const q = currentLevel.qs[currentQIndex]; const opts = document.getElementById('q-opts').children; const validSet = q.validAns ? q.validAns : [q.ans]; const correct = validSet.includes(idx); validSet.forEach(vi => { if (opts[vi]) opts[vi].classList.add('correct'); }); if (!correct) opts[idx].classList.add('wrong'); Array.from(opts).forEach((o,i) => { if (!validSet.includes(i) && i!==idx) o.classList.add('disabled'); }); document.getElementById('blank-span').textContent = q.blank; const fb = document.getElementById('q-fb'); const qCard = document.querySelector('.q-card'); if (correct) { sessionCorrect++; sessionCorrectStreak++; sessionMaxCorrectStreak = Math.max(sessionMaxCorrectStreak, sessionCorrectStreak); const wasComeback = sessionWrongStreak >= 2; sessionWrongStreak = 0; const gain = calculateDynamicGain(true, opts[validSet[0]]); if (sessionCorrectStreak === 3) showPhilosophy('correct3'); if (sessionCorrectStreak === 5) showPhilosophy('correct5'); if (wasComeback) showPhilosophy('recuperación'); fb.className = 'fb-box ok show'; fb.innerHTML = `✅ ¡Correcto! ${q.tip}`; SFX.correct(); if (qCard) { qCard.classList.remove('flash-green','flash-red'); void qCard.offsetWidth; qCard.classList.add('flash-green'); } const correctOpt = opts[validSet[0]]; const r = correctOpt.getBoundingClientRect(); spawnStars(r.left + r.width/2, r.top, 4); const xpEl = document.getElementById('q-xp-live'); const xpWrap = xpEl.closest('.quiz-xp-live') || xpEl.parentElement; xpWrap.classList.remove('xp-tick'); void xpWrap.offsetWidth; xpWrap.classList.add('xp-tick'); setTimeout(() => xpWrap.classList.remove('xp-tick'), 400); } else { sessionWrongStreak++; sessionCorrectStreak = 0; sessionHadWrong = true; if (sessionWrongStreak === 2) showPhilosophy('wrong2'); if (sessionWrongStreak === 5) showPhilosophy('wrong5'); const consolation = 3 + Math.floor(Math.random() * 6); addSessionXp(consolation, 'Intento', null); fb.className = 'fb-box ko show'; fb.innerHTML = `✨ Casi. ${q.tip}`; if (qCard) { qCard.classList.remove('flash-green','flash-red'); void qCard.offsetWidth; qCard.classList.add('flash-red'); } } document.getElementById('btn-next').className = 'btn-next show'; } function nextQ() { SFX.click(); currentQIndex++; if (currentQIndex >= currentLevel.qs.length) { finishLevel(); } else { renderQ(); document.getElementById('quiz-body').scrollTop = 0; } } function finishLevel() { const acc = Math.round((sessionCorrect / currentLevel.qs.length) * 100); window.__aLastAcc = acc; window.__aLastBrains = (acc === 100 ? 3 : (acc >= 55 ? 2 : (acc >= 5 ? 1 : 0))); let xpGain = sessionXp; if (currentLevel.boss && acc >= 60) { const b = 300; xpGain += b; sessionXpLines.push({label:'👑 Jefe derrotado', amount:b}); } const medal = medalForAcc(acc); if (medal === 1) { xpGain += 80; sessionXpLines.push({label:'🧠 Bronce 🧠', amount:80}); } else if (medal === 2) { xpGain += 200; sessionXpLines.push({label:'🧠🧠 Plata 🧠🧠', amount:200}); } else if (medal === 3) { xpGain += 500; sessionXpLines.push({label:'🧠🧠🧠 Oro', amount:500}); } if (acc === 100) { const b = currentLevel.boss ? 150 : 80; xpGain += b; sessionXpLines.push({label:'🎯 Nivel perfecto', amount:b}); } if (sessionMaxCorrectStreak >= 7) { xpGain += 120; sessionXpLines.push({label:'🔥 Racha legendaria x'+sessionMaxCorrectStreak, amount:120}); } else if (sessionMaxCorrectStreak >= 5) { xpGain += 60; sessionXpLines.push({label:'🔥 Racha x'+sessionMaxCorrectStreak, amount:60}); } sessionXp = xpGain; const wasCompleted = isCompleted(currentLevel); const newMedal = medalForAcc(acc); const oldMedal = getMedal(currentLevel); const prevXp = state.totalXp; state.completed[levelKey(currentLevel)] = true; if (!state.medals) state.medals = {}; if (newMedal > oldMedal) state.medals[levelKey(currentLevel)] = newMedal; if (!wasCompleted && currentWorld) { const worldNowDone = currentWorld.levels.every(l => isCompleted(l)); if (worldNowDone) { const worldBonus = 1000; xpGain += worldBonus; sessionXp = xpGain; sessionXpLines.push({label:'🌍 Mundo completado', amount:worldBonus}); } } if (!wasCompleted) { state.totalXp += xpGain; state.xpBalance += xpGain; } saveState(); updateAllMascots(); const phrasesGained = sessionCorrect; let unlockText = null; WORLDS.forEach((w, wi) => { w.levels.forEach((l, li) => { if (l.id === currentLevel.id) { if (li < w.levels.length - 1) { const next = w.levels[li+1]; if (!isCompleted(next)) unlockText = next.name; } else if (wi < WORLDS.length - 1) { unlockText = `🌐 Mundo ${wi+2}: ${WORLDS[wi+1].name}`; } } }); }); const finalMedal = state.medals[levelKey(currentLevel)] || 0; const emoji = currentLevel.boss ? '👑' : finalMedal===3 ? '🏆' : finalMedal===2 ? '⚡' : '💪'; document.getElementById('c-badge-ring') && (() => { const r = document.getElementById('c-badge-ring'); r.className = 'complete-medal-ring' + (finalMedal===3?' gold':finalMedal===2?' silver':finalMedal===1?' bronze':''); })(); document.getElementById('c-title').textContent = currentLevel.boss ? '¡Jefe derrotado!' : finalMedal===3 ? '¡Nivel dominado!' : '¡Nivel completado!'; document.getElementById('c-xp').textContent = `+${xpGain}`; const xpLinesEl = null; document.getElementById('c-acc').textContent = `${acc}%`; document.getElementById('c-phrases').textContent = `+${phrasesGained}`; { const pf=document.getElementById('c-perf-fill'); if(pf) setTimeout(()=>{ pf.style.width=acc+'%'; },100); } { const pp=document.getElementById('c-perf-pct'); if(pp){ pp.textContent=acc+'%'; pp.style.color=acc===100?'var(--mint)':acc>=80?'var(--lavender)':acc>=60?'var(--butter)':'var(--coral)'; } } const medalEl = document.getElementById('c-medal'); if (finalMedal > 0) { medalEl.style.display = 'flex'; document.getElementById('c-medal-stars').innerHTML = ''; document.getElementById('c-medal-label').textContent = medalLabel(finalMedal); document.getElementById('c-medal-tip').textContent = medalTip(finalMedal, acc); setTimeout(() => animateMedalStars(finalMedal), 80); } else { medalEl.style.display = 'none'; } const lvlNameEl = document.getElementById('c-level-name'); if(lvlNameEl) lvlNameEl.textContent = currentLevel.boss ? ('Jefe del Mundo ' + (currentWorld ? currentWorld.id : '')) : currentLevel.name; const nextLvl = findNextLevel(); if (nextLvl) { document.getElementById('btn-continue-text').textContent = `Siguiente: ${nextLvl.name} →`; document.getElementById('btn-continue').dataset.nextId = JSON.stringify({wid: nextLvl._wid, lid: nextLvl._lid}); } else { document.getElementById('btn-continue-text').textContent = 'Volver al mapa'; document.getElementById('btn-continue').dataset.nextId = ''; } { const pf=document.getElementById('c-perf-fill'); if(pf) pf.style.width='0%'; } show('screen-complete'); showPhilosophy('level'); if (currentLevel.boss) { SFX.boss(); setTimeout(() => { spawnConfetti(window.innerWidth/2, window.innerHeight*.3, 60); spawnStars(window.innerWidth/2, window.innerHeight*.25, 10); }, 150); setTimeout(() => spawnConfetti(window.innerWidth*.3, window.innerHeight*.2, 30), 400); setTimeout(() => spawnConfetti(window.innerWidth*.7, window.innerHeight*.2, 30), 600); } else { SFX.complete(); setTimeout(() => { spawnConfetti(window.innerWidth/2, window.innerHeight*.3, 35); spawnStars(window.innerWidth/2, window.innerHeight*.25, 6); }, 200); } if (!wasCompleted) checkNewUnlocks(prevXp); } function findNextLevel() { for (let wi=0; wi<WORLDS.length; wi++) { const w = WORLDS[wi]; for (let li=0; li<w.levels.length; li++) { const l = w.levels[li]; if (l.id === currentLevel.id) { if (li < w.levels.length-1 && isUnlocked(wi, li+1)) { return {...w.levels[li+1], _wid:wi, _lid:li+1}; } else if (li === w.levels.length-1 && wi < WORLDS.length-1 && isUnlocked(wi+1,0)) { return {...WORLDS[wi+1].levels[0], _wid:wi+1, _lid:0}; } return null; } } } return null; } function continueFromComplete() { SFX.click(); const data = document.getElementById('btn-continue').dataset.nextId; if (!data) { goToMap(); return; } const {wid, lid} = JSON.parse(data); startLevel(WORLDS[wid].levels[lid], WORLDS[wid]); } saveState(); updateAllMascots(); (function(){ const DEFAULT_STATE = () => ({ totalXp:0, xpBalance:0, spentXp:0, streak:1, lastPlayed:null, completed:{}, medals:{}, hints:5, char:{hat:null, shirt:null, skin:'skin_egg', owned:['h_none','s_none'], ownedSkins:['skin_egg']} }); const SKINS = [ {id:'skin_egg', icon:'🐣', name:'Pollito en cáscara', cost:0, req:0}, {id:'skin_chick', icon:'🐥', name:'Pollito', cost:90, req:100}, {id:'skin_smile', icon:'😊', name:'Sonrisa', cost:190, req:300}, {id:'skin_heart', icon:'❤️', name:'Corazón', cost:320, req:550}, {id:'skin_sparkles', icon:'✨', name:'Brillito', cost:480, req:900}, {id:'skin_cat', icon:'🐱', name:'Gato', cost:650, req:1300}, {id:'skin_dog', icon:'🐶', name:'Perro', cost:840, req:1800}, {id:'skin_frog', icon:'🐸', name:'Sapo', cost:1050, req:2300}, {id:'skin_monkey', icon:'🐵', name:'Mono', cost:1300, req:3000}, {id:'skin_laugh', icon:'😄', name:'Alegría', cost:1600, req:3800}, {id:'skin_lol', icon:'😂', name:'Carcajada', cost:1950, req:4800}, {id:'skin_cry_laugh', icon:'🤣', name:'Risa épica', cost:2350, req:6000}, {id:'skin_crying', icon:'😭', name:'Drama', cost:2800, req:7400}, {id:'skin_cool', icon:'😎', name:'Cool', cost:3300, req:9000}, {id:'skin_wink', icon:'😉', name:'Guiño', cost:3850, req:10800}, {id:'skin_think', icon:'🤔', name:'Pensador', cost:4450, req:13000}, {id:'skin_crazy', icon:'🤪', name:'Loco', cost:5100, req:15500}, {id:'skin_party', icon:'🥳', name:'Fiesta', cost:5800, req:18500}, {id:'skin_love', icon:'😍', name:'Enamorado', cost:6600, req:22000}, {id:'skin_star', icon:'🤩', name:'Estrella', cost:7500, req:26000}, {id:'skin_fire', icon:'🔥', name:'Fuego', cost:8600, req:31000}, {id:'skin_hot', icon:'🥵', name:'En llamas', cost:9800, req:37000}, {id:'skin_brain', icon:'🧠', name:'Cerebrito', cost:11200, req:44000}, {id:'skin_ninja', icon:'🥷', name:'Ninja', cost:12800, req:52000}, {id:'skin_ghost', icon:'👻', name:'Fantasma', cost:14600, req:62000}, {id:'skin_alien', icon:'👽', name:'Alienígena', cost:16600, req:74000}, {id:'skin_robot', icon:'🤖', name:'Robot', cost:19000, req:88000}, {id:'skin_wizard', icon:'🧙', name:'Mago', cost:21800, req:105000}, {id:'skin_crown', icon:'👑', name:'Rey', cost:25000, req:125000}, {id:'skin_trophy', icon:'🏆', name:'Campeón', cost:28800, req:150000}, {id:'skin_diamond', icon:'💎', name:'Diamante', cost:33500, req:180000}, {id:'skin_rocket', icon:'🚀', name:'Cohete', cost:39500, req:215000}, {id:'skin_unicorn', icon:'🦄', name:'Unicornio', cost:47000, req:260000}, {id:'skin_phoenix', icon:'🦅', name:'Fénix', cost:56000, req:315000}, {id:'skin_galaxy', icon:'🌌', name:'Galaxia', cost:68000, req:390000}, ]; window.ENGLISH_XP_FINAL_POLISH = true; function normalizeState(){ if (!state || typeof state !== 'object') state = DEFAULT_STATE(); if (typeof state.totalXp !== 'number') state.totalXp = 0; if (typeof state.spentXp !== 'number') state.spentXp = 0; if (typeof state.xpBalance !== 'number') state.xpBalance = Math.max(0, state.totalXp - state.spentXp); if (typeof state.hints !== 'number') state.hints = 0; state.hints = Math.max(0, Math.min(5, state.hints)); if (!state.completed) state.completed = {}; if (!state.medals) state.medals = {}; if (!state.char) state.char = DEFAULT_STATE().char; if (!Array.isArray(state.char.owned)) state.char.owned = ['h_none','s_none']; if (!state.char.owned.includes('h_none')) state.char.owned.push('h_none'); if (!state.char.owned.includes('s_none')) state.char.owned.push('s_none'); if (!Array.isArray(state.char.ownedSkins)) state.char.ownedSkins = ['skin_egg']; if (!state.char.ownedSkins.includes('skin_egg')) state.char.ownedSkins.push('skin_egg'); if (!state.char.skin) state.char.skin = 'skin_egg'; saveState(); } normalizeState(); window.getDisplayLevelNumber = function(level){ let n = 0; for (const w of WORLDS){ for (const l of w.levels){ if (!l.boss) n++; if (String(l.id) === String(level.id)) return l.boss ? ('Jefe del Mundo '+w.id) : ('Nivel '+n); } } return level.boss ? 'Jefe' : 'Nivel'; }; window.getEquippedSkin = function(){ return SKINS.find(s => s.id === state.char.skin) || SKINS[0]; }; window.getCharLevel = function(){ const s = getEquippedSkin(); return {xp:s.req||0, body:s.icon, name:s.name}; }; window.getCharLevelNum = function(){ let n = 1; SKINS.forEach((s,i)=>{ if(state.totalXp >= s.req) n = i+1; }); return n; }; window.updateAllMascots = function(){ normalizeState(); const cl = getCharLevel(); const body = cl.body; const lvlNum = getCharLevelNum(); ['map','lesson','quiz','complete'].forEach(prefix => { const m = document.getElementById(prefix+'-mascot'); if (m && m.childNodes[0]) m.childNodes[0].textContent = body; const h = document.getElementById(prefix+'-hat'); if (h) h.textContent = ''; const s = document.getElementById(prefix+'-shirt'); if (s) s.textContent = ''; }); const mapLevel = document.getElementById('map-mascot-level'); if (mapLevel) mapLevel.textContent = 'Nv.'+lvlNum; const quizName = document.getElementById('quiz-char-name'); if (quizName) quizName.textContent = cl.name; const wd = document.getElementById('wd-char'); if (wd && wd.childNodes[0]) wd.childNodes[0].textContent = body; const wh = document.getElementById('wd-hat'); if (wh) wh.textContent = ''; const ws = document.getElementById('wd-shirt'); if (ws) ws.textContent = ''; const wn = document.getElementById('wd-name'); if (wn) wn.textContent = cl.name; const wl = document.getElementById('wd-level'); if (wl) wl.textContent = 'Nivel '+lvlNum+' · '+state.xpBalance+' XP disponible'; const tm = document.getElementById('map-title-mascot'); if (tm && tm.childNodes[0]) tm.childNodes[0].textContent = body; const th = document.getElementById('map-title-hat'); if (th) th.textContent = ''; const qmb = document.getElementById('quiz-char-mini-body'); if (qmb && qmb.childNodes[0]) qmb.childNodes[0].textContent = body; const qmh = document.getElementById('quiz-char-mini-hat'); if (qmh) qmh.textContent = ''; const qmn = document.getElementById('quiz-char-mini-name'); if (qmn) qmn.textContent = cl.name; }; window.openResetModal = function(){ document.getElementById('reset-modal')?.classList.add('show'); }; window.closeResetModal = function(){ document.getElementById('reset-modal')?.classList.remove('show'); }; window.confirmResetProgress = function(){ state = DEFAULT_STATE(); localStorage.setItem('englishxp_v2', JSON.stringify(state)); closeResetModal(); showToast('🌱 Progreso borrado. Puedes empezar de nuevo con calma.'); showPhilosophy('reset'); updateAllMascots(); renderWardrobe(); renderMap(); show('screen-welcome'); }; function skinUnlocked(s){ return state.totalXp >= s.req; } function skinOwned(s){ return s.cost === 0 || state.char.ownedSkins.includes(s.id); } window.buyOrEquipSkin = function(id){ normalizeState(); const s = SKINS.find(x=>x.id===id); if(!s) return; if(!skinUnlocked(s)){ showToast('🔒 Requiere '+s.req+' XP total'); return; } if(!skinOwned(s)){ if(state.xpBalance < s.cost){ showToast('🧠 Saldo insuficiente. Faltan '+(s.cost-state.xpBalance)+' XP'); return; } state.xpBalance -= s.cost; state.spentXp += s.cost; state.char.ownedSkins.push(s.id); showToast('🛍️ Personaje comprado: '+s.name+' · -'+s.cost+' XP'); SFX.unlock(); } else { SFX.click(); } state.char.skin = s.id; saveState(); updateAllMascots(); renderWardrobe(); showPhilosophy('identity'); }; window.renderWardrobe = function(){ normalizeState(); updateAllMascots(); const sec = document.getElementById('wardrobe-sections'); if(!sec) return; sec.innerHTML = ''; const header = document.createElement('div'); const goldStars = Object.values(state.medals||{}).reduce((s,m)=>s+(m||0),0); header.innerHTML = `<div class="wd-stats-stack"><div class="wd-xp-row"><div class="wd-stat wd-stat-xp" style="--sc:#ffe040"><div class="wd-stat-icon">⭐</div><div class="wd-stat-val">${state.xpBalance}</div><div class="wd-stat-lbl">XP disponible</div></div><div class="wd-stat wd-stat-xp" style="--sc:#00cfff"><div class="wd-stat-icon">⭐</div><div class="wd-stat-val">${state.totalXp}</div><div class="wd-stat-lbl">XP total</div></div></div><div class="wd-secondary-row"><div class="wd-stat" style="--sc:#00e5c8"><div class="wd-stat-icon">💡</div><div class="wd-stat-val">${typeof getHints==='function'?getHints():(state.hints||0)}<span style="font-size:11px;opacity:.55">/5</span></div><div class="wd-stat-lbl">Pistas</div></div><div class="wd-stat" style="--sc:#fbbf24"><div class="wd-stat-icon">🧠</div><div class="wd-stat-val">${goldStars}</div><div class="wd-stat-lbl">Cerebros</div></div></div></div>`; sec.appendChild(header); const skinsBox = document.createElement('div'); skinsBox.className = 'wardrobe-section'; let skinHtml = '<div class="wardrobe-section-title">🧬 Elige tu personaje</div><div class="skin-grid">'; SKINS.forEach(s=>{ const unlocked = skinUnlocked(s), owned = skinOwned(s), selected = state.char.skin === s.id; let stateText = selected ? '✅ Equipado' : owned ? '✔ Listo' : unlocked ? (s.cost+' XP') : ('🔒 Requiere '+s.req+' XP'); let btn = selected ? 'Equipado' : owned ? 'Equipar' : unlocked ? 'Comprar' : 'Bloqueado'; skinHtml += '<div class="skin-card '+(selected?'selected ':'')+(!unlocked?'locked':'')+'" onclick="buyOrEquipSkin(\''+s.id+'\')">'+ '<div class="skin-emoji">'+s.icon+'</div>'+ '<div class="skin-name">'+s.name+'</div>'+ '<div class="skin-state">'+stateText+'</div>'+ '<button class="skin-action '+(!unlocked?'lock':(!owned?'buy':''))+'">'+btn+'</button></div>'; }); skinHtml += '</div>'; skinsBox.innerHTML = skinHtml; sec.appendChild(skinsBox); const reset=document.createElement('button'); reset.className='btn-reset-progress'; reset.textContent='Borrar progreso'; reset.onclick=openResetModal; sec.appendChild(reset); }; window.showPhilosophy = function(type){ const messages = { correct3:['🔥 Mira esa racha. Estás construyendo confianza.','✨ Ya no estás adivinando. Estás entendiendo.','⚡ Tu cerebro ya está reconociendo patrones.'], correct5:['🌟 Cinco seguidas. Esto ya parece dominio.','🧠 Tu memoria está conectando piezas. Sigue.','🚀 La constancia también tiene sonido de victoria.'], wrong2:['🫂 Respira. Equivocarse también es aprender.','🌱 No estás fallando. Estás construyendo conexiones.','💡 Dos errores no son derrota. Son pistas.'], wrong5:['🫶 Pausa un segundo. Tu valor no depende de acertar todo.','🌧️ Incluso la confusión está enseñando algo. Sigue suave.','🧩 Tu cerebro está ordenando piezas difíciles.'], comeback:['⚡ Volviste. Eso también es progreso.','🌤️ Te recuperaste. Ahí nace la confianza real.','💪 Caer y responder mejor: eso es aprender.'], level:['🌱 El conocimiento es de todos. Sigue.','💡 El progreso importa más que la perfección.','🌎 El inglés no es talento reservado. Es práctica accesible.'], boss:['👑 Jefe derrotado. Lo difícil también se puede aprender.','🏆 Acabas de convertir práctica en identidad.','🔥 Esto no fue suerte. Fue constancia.'], perfect:['🏆 Nivel perfecto. Precisión con calma.','✨ Impecable. Tu atención está creciendo.','🌟 Sin errores. Tu confianza tiene raíces.'], retry:['🔁 Repetir no es retroceder. Es afilar la mente.','🌱 Intentarlo otra vez también cuenta.','🧠 Cada repetición deja huella.'], shop:['🛍️ Aprender te dio valor. Ahora ese valor construye identidad.','✨ Tu personaje también cuenta tu historia.','🧠 Tu esfuerzo acaba de convertirse en algo visible.'], identity:['🧬 Este es tu personaje. Tu progreso tiene rostro.','✨ La identidad también motiva a continuar.','🌱 Tu camino empieza a parecerse a ti.'], reset:['🌱 Nuevo inicio. Sin culpa. Con más experiencia.'] }; const arr = messages[type] || messages.level; const layer = document.getElementById('emotion-layer'); if(!layer) return; layer.classList.add('active'); layer.innerHTML = '<div class="emotion-card">'+pick(arr)+'<div class="emotion-note">Aprender no exige perfección. Exige volver.</div></div>'; const card = layer.querySelector('.emotion-card'); setTimeout(()=>{ if(card){ card.classList.add('hide'); } setTimeout(()=>{ layer.classList.remove('active'); layer.innerHTML=''; }, 300); }, 3300); }; window.calculateDynamicGain = function(correct, refEl){ if(!correct) return 0; const base = currentLevel && currentLevel.boss ? 123 : (67 + Math.floor(Math.random() * 57)); let gain = base; let labels = ['Respuesta']; if(currentQIndex === 0){ gain += 11; labels.push('primer intento'); } if(sessionCorrectStreak >= 2){ const bonus = Math.min(54, sessionCorrectStreak * 7); gain += bonus; labels.push('combo x'+(sessionCorrectStreak+1)); } if(sessionHadWrong && sessionWrongStreak === 0){ gain += 33; labels.push('recuperación'); sessionHadWrong=false; } if(Math.random() < 0.12){ gain += 19 + Math.floor(Math.random()*14); labels.push('sorpresa ✨'); } addSessionXp(gain, labels.join(' · '), refEl); return gain; }; window.nextQ = function(){ SFX.click(); currentQIndex++; if(currentQIndex >= currentLevel.qs.length) finishLevel(); else { renderQ(); document.getElementById('quiz-body').scrollTop = 0; } }; const oldStartLevel = window.startLevel; window.startLevel = function(level, world){ if (isCompleted(level)) showPhilosophy('retry'); oldStartLevel(level, world); }; window.renderQ = function(){ const q = currentLevel.qs[currentQIndex]; answered=false; document.getElementById('quiz-label').textContent = getDisplayLevelNumber(currentLevel)+' · '+(currentQIndex+1)+'/'+currentLevel.qs.length; document.getElementById('q-xp-live').textContent = sessionXp; document.getElementById('q-prog-fill').style.width = `${(currentQIndex / currentLevel.qs.length) * 100}%`; document.getElementById('q-flag').textContent = '🇨🇴'; document.getElementById('q-es').textContent = q.es; const parts = q.en.split('___'); document.getElementById('q-en').innerHTML = parts[0] + '<span class="blank" id="blank-span">___</span>' + (parts[1]||''); const opts = document.getElementById('q-opts'); opts.innerHTML=''; q.opts.forEach((o,i)=>{ const b=document.createElement('button'); b.className='opt'; b.onclick=()=>selectAns(i); b.innerHTML='<span class="ol">'+String.fromCharCode(65+i)+'</span><span>'+o+'</span>'; opts.appendChild(b); }); const fb=document.getElementById('q-fb'); fb.className='fb-box'; fb.innerHTML=''; document.getElementById('btn-next').className='btn-next'; updateAllMascots(); }; const oldSelectAns = window.selectAns; window.selectAns = function(idx){ oldSelectAns(idx); const fb = document.getElementById('q-fb'); if (fb && fb.innerHTML) fb.innerHTML = fb.innerHTML.replace('✅ ¡Correcto!', '✅ Correcto').replace('✨ Casi.', '🌱 Casi.'); }; window.finishLevel = function(){ const acc = Math.round((sessionCorrect / currentLevel.qs.length) * 100); let xpGain = sessionXp; if (currentLevel.boss && acc >= 60) { const b=285; xpGain += b; sessionXpLines.push({label:'👑 Jefe derrotado', amount:b}); } const medal = medalForAcc(acc); if (medal === 1) { const b=75; xpGain += b; sessionXpLines.push({label:'🧠 Bronce 🧠', amount:b}); } else if (medal === 2) { const b=190; xpGain += b; sessionXpLines.push({label:'🧠🧠 Plata 🧠🧠', amount:b}); } else if (medal === 3) { const b=450; xpGain += b; sessionXpLines.push({label:'🧠🧠🧠 Oro 🧠🧠🧠', amount:b}); } if (acc === 100) { const b=currentLevel.boss ? 142 : 75; xpGain += b; sessionXpLines.push({label:'🎯 Perfecto', amount:b}); } if (sessionMaxCorrectStreak >= 7) { const b=115; xpGain += b; sessionXpLines.push({label:'🔥 Racha legendaria x'+sessionMaxCorrectStreak, amount:b}); } else if (sessionMaxCorrectStreak >= 5) { const b=57; xpGain += b; sessionXpLines.push({label:'🔥 Racha x'+sessionMaxCorrectStreak, amount:b}); } sessionXp = xpGain; const wasCompleted = isCompleted(currentLevel); const newMedal = medalForAcc(acc), oldMedal = getMedal(currentLevel), prevXp = state.totalXp; state.completed[levelKey(currentLevel)] = true; if(!state.medals) state.medals = {}; if(newMedal > oldMedal) state.medals[levelKey(currentLevel)] = newMedal; if(!wasCompleted && currentWorld){ const worldNowDone = currentWorld.levels.every(l => isCompleted(l)); if(worldNowDone){ const wb=900; xpGain += wb; sessionXp=xpGain; sessionXpLines.push({label:'🌍 Mundo completado', amount:wb}); } } state.totalXp += xpGain; state.xpBalance += xpGain; saveState(); updateAllMascots(); const phrasesGained = sessionCorrect; let unlockText = null; WORLDS.forEach((w,wi)=>w.levels.forEach((l,li)=>{ if(String(l.id)===String(currentLevel.id)){ if(li<w.levels.length-1){ const next=w.levels[li+1]; if(!isCompleted(next)) unlockText=next.boss?'Jefe del Mundo '+w.id:next.name; } else if(wi<WORLDS.length-1) unlockText='🌐 Mundo '+(wi+2)+': '+WORLDS[wi+1].name; }})); const finalMedal = state.medals[levelKey(currentLevel)] || 0; const emoji = currentLevel.boss ? '👑' : finalMedal===3 ? '🏆' : finalMedal===2 ? '⚡' : '💪'; document.getElementById('c-badge-ring') && (() => { const r = document.getElementById('c-badge-ring'); r.className = 'complete-medal-ring' + (finalMedal===3?' gold':finalMedal===2?' silver':finalMedal===1?' bronze':''); })(); document.getElementById('c-title').textContent = currentLevel.boss ? '¡Jefe derrotado!' : finalMedal===3 ? '¡Nivel dominado!' : '¡Nivel completado!'; document.getElementById('c-xp').textContent = `+${xpGain}`; document.getElementById('c-acc').textContent = `${acc}%`; document.getElementById('c-phrases').textContent = `+${phrasesGained}`; const perfFill = document.getElementById('c-perf-fill'); const perfPct = document.getElementById('c-perf-pct'); if(perfFill){ setTimeout(()=>{ perfFill.style.width=acc+'%'; },100); } if(perfPct){ perfPct.textContent=acc+'%'; perfPct.style.color=acc===100?'var(--mint)':acc>=80?'var(--lavender)':acc>=60?'var(--butter)':'var(--coral)'; } const medalEl=document.getElementById('c-medal'); if(finalMedal>0){ medalEl.style.display='flex'; document.getElementById('c-medal-stars').innerHTML=''; document.getElementById('c-medal-label').textContent=medalLabel(finalMedal); document.getElementById('c-medal-tip').textContent=medalTip(finalMedal,acc); setTimeout(()=>animateMedalStars(finalMedal),80); } else medalEl.style.display='none'; const lvlNameEl=document.getElementById('c-level-name'); if(lvlNameEl) lvlNameEl.textContent=currentLevel.boss?('Jefe del Mundo '+(currentWorld?currentWorld.id:'')):(currentLevel.name); const nextLvl=findNextLevel(); if(nextLvl){ document.getElementById('btn-continue-text').textContent = `Siguiente: ${nextLvl.name} →`; document.getElementById('btn-continue').dataset.nextId=JSON.stringify({wid:nextLvl._wid,lid:nextLvl._lid}); } else { document.getElementById('btn-continue-text').textContent='Volver al mapa'; document.getElementById('btn-continue').dataset.nextId=''; } { const pf=document.getElementById('c-perf-fill'); if(pf) pf.style.width='0%'; }
// Render brains earned + performance message
(function(){
  var brains = acc === 100 ? 3 : (acc >= 55 ? 2 : (acc >= 5 ? 1 : 0));
  var iconsEl = document.getElementById('complete-brains-icons');
  var msgEl = document.getElementById('complete-brains-msg');
  if(iconsEl){
    iconsEl.innerHTML = '';
    var msgs = ['¡Inténtalo de nuevo! 💪','🌱 Sigue practicando, ¡vas bien!','⚡ ¡Buen trabajo! Repite para oro.','🏆 ¡Perfecto! Nivel dominado.'];
    for(var i=0;i<3;i++){
      var b = document.createElement('span');
      b.textContent = '🧠';
      if(i < brains){
        b.style.cssText = 'font-size:32px;line-height:1;display:inline-block;filter:drop-shadow(0 0 6px rgba(255,224,64,.9)) drop-shadow(0 0 14px rgba(255,224,64,.5));animation:completeBrainPop .4s '+(i*0.18)+'s cubic-bezier(.34,1.7,.64,1) both';
      } else {
        b.style.cssText = 'font-size:32px;line-height:1;display:inline-block;opacity:.16;filter:grayscale(1)';
      }
      iconsEl.appendChild(b);
    }
    if(msgEl) msgEl.textContent = msgs[brains] || '';
  }
})();
show('screen-complete'); showPhilosophy(currentLevel.boss?'boss':(acc===100?'perfect':'level')); if(currentLevel.boss){ SFX.boss(); setTimeout(()=>{spawnConfetti(window.innerWidth/2,window.innerHeight*.3,60);spawnStars(window.innerWidth/2,window.innerHeight*.25,10);},150);setTimeout(()=>spawnConfetti(window.innerWidth*.3,window.innerHeight*.2,30),400);setTimeout(()=>spawnConfetti(window.innerWidth*.7,window.innerHeight*.2,30),600); } else { SFX.complete(); setTimeout(()=>{spawnConfetti(window.innerWidth/2,window.innerHeight*.3,35);spawnStars(window.innerWidth/2,window.innerHeight*.25,6);},200); } if(!wasCompleted) checkNewUnlocks(prevXp); }; window.renderMap = function(){
  normalizeState();
  const title = document.getElementById('map-title');
  if (title) title.textContent = 'Árbol de habilidades';
  const totalXpEl = document.getElementById('total-xp-display');
  if (totalXpEl) totalXpEl.textContent = state.totalXp;
  const balEl = document.getElementById('xp-balance-display');
  if (balEl) balEl.textContent = state.xpBalance;
  const spentEl = document.getElementById('spent-xp-display');
  if (spentEl) spentEl.textContent = state.spentXp;
  if (typeof refreshHintsUI === 'function') refreshHintsUI();
  const totalLevels = WORLDS.reduce((sum, world) => sum + world.levels.length, 0);
  const completedLevels = WORLDS.reduce((sum, world) => sum + world.levels.filter(level => isCompleted(level)).length, 0);
  const xpFill = document.getElementById('xp-bar-fill');
  if (xpFill) xpFill.style.width = Math.min(100, (completedLevels / totalLevels * 100)) + '%';
  const phrasesEl = document.getElementById('phrases-dominated');
  if (phrasesEl) phrasesEl.textContent = totalPhrases();
  const done = Object.keys(state.completed).length;
  const mapSub = document.getElementById('map-sub');
  if (mapSub) mapSub.textContent = `${done} nivel${done===1?'':'es'} completado${done===1?'':'s'} · Racha ${state.streak||1}d 🔥`;
  const container = document.getElementById('worlds-container');
  container.innerHTML = '';
  const isWorldOpenByBoss = (worldIndex) => {
    if (worldIndex === 0) return true;
    const previousWorld = WORLDS[worldIndex - 1];
    if (!previousWorld || !Array.isArray(previousWorld.levels)) return false;
    const previousBoss = previousWorld.levels.find(level => level && level.boss);
    return !!(previousBoss && getMedal(previousBoss) >= 3);
  };
  // El mundo abierto automáticamente será el mundo desbloqueado más avanzado.
  // Así, al ganar 3 cerebros en el boss del mundo 1, aparece abierto el mundo 2 completo;
  // al ganar el boss del mundo 2, aparece abierto el mundo 3 completo; y así hasta el 7.
  let autoOpenWorldIndex = 0;
  WORLDS.forEach((_, index) => {
    if (isWorldOpenByBoss(index)) autoOpenWorldIndex = index;
  });
  WORLDS.forEach((world, wi) => {
    const worldLocked = !isWorldOpenByBoss(wi);
    const block = document.createElement('div');
    block.className = 'world-block' + (worldLocked ? ' locked-world' : '');
    block.style.setProperty('--wc', world.color);
    if (!worldLocked) {
      block.style.setProperty('--wglow-color', world.color + '40');
    }
    const worldDone = world.levels.filter(level => isCompleted(level)).length;
    const allDone = world.levels.every(level => isCompleted(level));
    const allGold = !worldLocked && allDone && world.levels.every(level => getMedal(level) === 3);
    if (allGold) block.classList.add('all-gold');
    if (!worldLocked && wi === autoOpenWorldIndex) block.classList.add('open');
    const worldName = worldLocked ? `MUNDO ${world.id}` : `MUNDO ${world.id} — ${world.name}`;
    const worldSub = worldLocked
      ? '🔒'
      : `${world.desc} · ${worldDone}/${world.levels.length} completados`;
    block.innerHTML =
      `<div class="world-header" ${worldLocked ? '' : 'onclick="toggleWorld(this)"'}>` +
        `<div class="world-icon" style="${worldLocked ? 'filter:grayscale(1) opacity(.35)' : `background:${world.color}20;border:1px solid ${world.color}55;filter:drop-shadow(0 0 6px ${world.color}66);border-radius:12px`}">${world.icon}</div>` +
        `<div class="world-info">` +
          `<div class="world-name" style="color:${worldLocked ? 'rgba(180,185,220,.42)' : world.color};text-shadow:${worldLocked ? 'none' : `0 0 5px ${world.color}44`}">${worldName}</div>` +
          `<div class="world-sub">${worldSub}</div>` +
        `</div>` +
        `${worldLocked ? '' : '<div class="world-chevron">▼</div>'}` +
      `</div>` +
      `<div class="world-levels"></div>`;
    const levelsEl = block.querySelector('.world-levels');
    if (!worldLocked) {
      world.levels.forEach((level) => {
        const done = isCompleted(level);
        const medal = done ? getMedal(level) : 0;
        const row = document.createElement('div');
        row.className =
          'level-row' +
          (level.boss ? ' boss-row' : '') +
          (done ? ' completed' : '') +
          (medal === 3 ? ' gold-mastered' : '');
        const badge = done
          ? `<span class="lv-badge done" style="display:flex;align-items:center;gap:3px">${medalStars(medal)}</span>`
          : `<span class="lv-badge ready">▶ Jugar</span>`;
        const display = level.boss
          ? '👑'
          : (typeof getDisplayLevelNumber === 'function' ? getDisplayLevelNumber(level).replace('Nivel ', '') : level.id);
        row.innerHTML =
          `<div class="lv-num" style="background:${done ? 'var(--green)' : world.color}22;color:${done ? 'var(--green)' : world.color}">${display}</div>` +
          `<div class="lv-title">` +
            `<div class="lv-name">${level.boss ? 'Jefe del Mundo ' + world.id : level.name}</div>` +
            `<div class="lv-sub">${level.boss ? level.sub + ' · reto final' : level.sub}</div>` +
          `</div>` +
          badge;
        row.onclick = () => startLevel(level, world);
        row.style.cursor = 'pointer';
        levelsEl.appendChild(row);
      });
    }
    container.appendChild(block);
  });
  updateAllMascots();
}; document.addEventListener('DOMContentLoaded', function(){ const homeMain=document.querySelector('.home-philosophy-main'); if(homeMain) homeMain.textContent='El conocimiento es de todos.'; const homeSub=document.querySelector('.home-philosophy-sub'); if(homeSub) homeSub.textContent='El progreso importa más que la perfección. El inglés debe sentirse alcanzable. Aprender también es equivocarse.'; const custom=document.querySelector('.btn-customize'); if(custom) custom.textContent='Personalizar'; document.querySelectorAll('.lesson-back,.wardrobe-back').forEach(b=>{ if(b.textContent.trim()==='←') b.innerHTML='← Volver'; }); const cm=document.querySelector('#screen-complete .mascot-badge'); if(cm) cm.textContent='Personalizar'; updateAllMascots(); renderMap(); }); const homeMain=document.querySelector('.home-philosophy-main'); if(homeMain) homeMain.textContent='El conocimiento es de todos.'; const homeSub=document.querySelector('.home-philosophy-sub'); if(homeSub) homeSub.textContent='El progreso importa más que la perfección. El inglés debe sentirse alcanzable. Aprender también es equivocarse.'; const custom=document.querySelector('.btn-customize'); if(custom) custom.textContent='Personalizar'; document.querySelectorAll('.lesson-back,.wardrobe-back').forEach(b=>{ if(b.textContent.trim()==='←') b.innerHTML='← Volver'; }); const cm=document.querySelector('#screen-complete .mascot-badge'); if(cm) cm.textContent='Personalizar'; updateAllMascots(); })(); function showCelebrationOnly(){ try{ if(typeof launchConfetti === 'function') launchConfetti(); }catch(e){} try{ if(typeof celebrateLevelComplete === 'function') celebrateLevelComplete(); }catch(e){} try{ if(typeof playSound === 'function') playSound('success'); }catch(e){} try{ if(typeof playSuccessSound === 'function') playSuccessSound(); }catch(e){} setTimeout(()=>{ try{ if(typeof goToMap === 'function') goToMap(); else if(typeof showMap === 'function') showMap(); else if(typeof renderMap === 'function') renderMap(); }catch(e){} },1500); }
questions?.forEach?.(q=>{
if(!q.reason){
q.reason = `La opción correcta coincide con la estructura correcta de la oración.`;
}
if(!q.shortExplanation){
q.shortExplanation = `La palabra correcta se usa naturalmente en este contexto.`;
}
if(!q.example){
q.example = `Example: ${q.answer || q.correct || 'She is happy'}`;
}
});


;

/* === englishxp-master-patch === */

;
(function(){ 'use strict'; const PHILO_MSG = { correct3:['✨ Ya no estás adivinando. Estás entendiendo.','🔥 Mira esa racha. Estás construyendo confianza.','⚡ Tu cerebro ya reconoce los patrones.'], correct5:['🌟 Cinco seguidas. Esto ya parece dominio.','🧠 Tu memoria conecta piezas. Sigue.','🚀 La constancia también tiene sonido de victoria.'], wrong2:['🫂 Respira. Equivocarse también es aprender.','🌱 No estás fallando. Estás construyendo.','💡 Dos errores no son derrota. Son pistas.'], wrong5:['🫶 Tu valor no depende de acertar todo.','🌧️ La confusión también enseña. Sigue suave.','🧩 Tu cerebro está ordenando piezas difíciles.'], comeback:['⚡ Volviste. Eso también es progreso.','🌤️ Te recuperaste. Ahí nace la confianza real.','💪 Caer y responder mejor: eso es aprender.'], 'recuperación':['⚡ Volviste. Eso también es progreso.','🌤️ Te recuperaste. Ahí nace la confianza real.','💪 Caer y responder mejor: eso es aprender.'], level:['🌱 El conocimiento es de todos. Sigue.','💡 El progreso importa más que la perfección.','🌎 El inglés no es talento reservado. Es práctica.'], boss:['👑 Jefe derrotado. Lo difícil también se aprende.','🏆 Convertiste práctica en identidad.','🔥 Esto no fue suerte. Fue constancia.'], perfect:['🏆 Nivel perfecto. Precisión con calma.','✨ Impecable. Tu atención crece.','🌟 Sin errores. Tu confianza tiene raíces.'], retry:['🔁 Repetir no es retroceder. Es afilar.','🌱 Intentarlo otra vez también cuenta.','🧠 Cada repetición deja huella.'], shop:['🛍️ Aprender te dio valor. Ese valor construye identidad.','✨ Tu personaje también cuenta tu historia.'], identity:['🧬 Este es tu personaje. Tu progreso tiene rostro.','✨ La identidad también motiva a continuar.'], reset:['🌱 Nuevo inicio. Sin culpa. Con más experiencia.'] }; function rnd(arr){ return arr[Math.floor(Math.random()*arr.length)]; } window.showPhilosophy = function(type){ const layer = document.getElementById('emotion-layer'); if(!layer) return; const arr = PHILO_MSG[type] || PHILO_MSG.level; layer.onclick = null; layer.classList.remove('active','dismissable'); void layer.offsetWidth; layer.innerHTML = '<div class="emotion-card" role="status" aria-live="polite">' + '<div class="emotion-msg-main">' + rnd(arr) + '</div>' + '<div class="emotion-note">Aprender no exige perfección. Exige volver.</div>' + '<div class="emotion-tap">Toca para continuar</div>' + '</div>'; void layer.offsetWidth; layer.classList.add('active'); const card = layer.querySelector('.emotion-card'); let canClose = false, closed = false; function doClose(){ if(!canClose || closed) return; closed = true; card && card.classList.add('hide'); setTimeout(()=>{ layer.classList.remove('active','dismissable'); layer.innerHTML=''; layer.onclick=null; }, 260); } setTimeout(()=>{ canClose=true; layer.classList.add('dismissable'); layer.onclick=doClose; }, 1000); setTimeout(()=>{ canClose=true; doClose(); }, 4200); }; function playStreakSound(n){ try{ const ctx = new (window.AudioContext||window.webkitAudioContext)(); const NOTES = [523.25,659.25,783.99,1046.5,1318.5]; const freq = NOTES[Math.min(n-2, NOTES.length-1)]; const o=ctx.createOscillator(), g=ctx.createGain(); o.type='triangle'; o.frequency.setValueAtTime(freq*0.5,ctx.currentTime); o.frequency.exponentialRampToValueAtTime(freq,ctx.currentTime+0.05); g.gain.setValueAtTime(0.0001,ctx.currentTime); g.gain.linearRampToValueAtTime(0.20,ctx.currentTime+0.03); g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.25); o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime); o.stop(ctx.currentTime+0.28); const o2=ctx.createOscillator(), g2=ctx.createGain(); o2.type='sine'; o2.frequency.value=freq*2; g2.gain.setValueAtTime(0.0001,ctx.currentTime); g2.gain.linearRampToValueAtTime(0.08,ctx.currentTime+0.02); g2.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.18); o2.connect(g2); g2.connect(ctx.destination); o2.start(ctx.currentTime); o2.stop(ctx.currentTime+0.2); }catch(e){} } function refreshStreakBadge(streak){ const badge = document.getElementById('quiz-streak-counter'); const num = document.getElementById('quiz-streak-num'); if(!badge||!num) return; if(streak >= 2){ num.textContent = streak; const wasHidden = badge.style.display==='none'||!badge.style.display; badge.style.display = 'flex'; if(wasHidden){ badge.style.animation='none'; void badge.offsetWidth; badge.style.animation='streak-appear .35s cubic-bezier(.34,1.6,.64,1)'; } else { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); } playStreakSound(streak); } else if(streak===0){ badge.classList.remove('bump'); badge.classList.add('reset'); setTimeout(()=>{ badge.style.display='none'; badge.classList.remove('reset'); num.textContent='0'; },280); } } function getHints(){ return (state && typeof state.hints === 'number') ? state.hints : 0; } function setHints(n){ if(!state) return; state.hints = Math.max(0, Math.min(5, n)); if(typeof saveState === 'function') saveState(); } function playHintEarnedSound(){ try{ const ctx = new (window.AudioContext||window.webkitAudioContext)(); const o1=ctx.createOscillator(), g1=ctx.createGain(); o1.type='triangle'; o1.frequency.setValueAtTime(196,ctx.currentTime); o1.frequency.exponentialRampToValueAtTime(392,ctx.currentTime+0.18); g1.gain.setValueAtTime(0.0001,ctx.currentTime); g1.gain.linearRampToValueAtTime(0.20,ctx.currentTime+0.03); g1.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.32); o1.connect(g1); g1.connect(ctx.destination); o1.start(ctx.currentTime); o1.stop(ctx.currentTime+0.35); const o2=ctx.createOscillator(), g2=ctx.createGain(); o2.type='sine'; o2.frequency.setValueAtTime(784,ctx.currentTime+0.14); o2.frequency.exponentialRampToValueAtTime(1047,ctx.currentTime+0.28); g2.gain.setValueAtTime(0.0001,ctx.currentTime+0.14); g2.gain.linearRampToValueAtTime(0.10,ctx.currentTime+0.17); g2.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.38); o2.connect(g2); g2.connect(ctx.destination); o2.start(ctx.currentTime+0.14); o2.stop(ctx.currentTime+0.4); }catch(e){} } function refreshHintsUI(){ const n = getHints(); const counter = document.getElementById('hints-available'); const btn = document.getElementById('btn-hint'); if(counter) counter.textContent = n; if(btn) btn.disabled = n<=0 || answered===true; const topCount = document.getElementById('topbar-hints-count'); if(topCount) topCount.textContent = n; const topBadge = document.getElementById('topbar-hints'); if(topBadge) topBadge.style.opacity = n > 0 ? '1' : '0.4'; } function animateHintCounter(){ const counterEl = document.getElementById('hints-counter'); if(counterEl){ counterEl.classList.remove('hint-earned-anim'); void counterEl.offsetWidth; counterEl.classList.add('hint-earned-anim'); setTimeout(()=>counterEl.classList.remove('hint-earned-anim'),600); } const topBadge = document.getElementById('topbar-hints'); if(topBadge){ topBadge.classList.remove('bump'); void topBadge.offsetWidth; topBadge.classList.add('bump'); setTimeout(()=>topBadge.classList.remove('bump'),350); } } function spawnFlyingHint(fromEl){ try{ let counterEl = document.getElementById('hints-counter'); const quizScreen = document.getElementById('screen-quiz'); if(!quizScreen || !quizScreen.classList.contains('active')){ counterEl = document.getElementById('topbar-hints'); } if(!fromEl||!counterEl) return; const from = fromEl.getBoundingClientRect(); const to = counterEl.getBoundingClientRect(); const el = document.createElement('div'); el.className = 'flying-pista'; el.textContent = '💡'; const sx = from.left+from.width/2-12; const sy = from.top+from.height/2-12; const dx = (to.left+to.width/2)-sx; const dy = (to.top+to.height/2)-sy; el.style.cssText = `left:${sx}px;top:${sy}px;--fly-dx:${dx}px;--fly-dy:${dy}px`; document.body.appendChild(el); setTimeout(()=>el.remove(), 750); }catch(e){} } function earnHint(wrongOptEl){ if(getHints() >= 5) return; if(window.__earnHintFiredThisAnswer) return; window.__earnHintFiredThisAnswer = true; spawnFlyingHint(wrongOptEl); setTimeout(()=>{ setHints(getHints() + 1); refreshHintsUI(); animateHintCounter(); playHintEarnedSound(); }, 340); } window.useHint = function(){ if(window.__aHintUpgradeDone) return; }; const _BASE_selectAns = (function findBase(){ return window.selectAns; })(); window.selectAns = function(idx){ if(typeof answered!=='undefined'&&answered) return; _BASE_selectAns(idx); const q = currentLevel&&currentLevel.qs[currentQIndex]; if(!q) return; const correct = (idx === q.ans); if(correct){ refreshStreakBadge(sessionCorrectStreak); } else { if(sessionCorrectStreak===0) refreshStreakBadge(0); const optBtns = document.querySelectorAll('#q-opts .opt'); earnHint(optBtns[idx]||null); } const btn = document.getElementById('btn-hint'); if(btn) btn.disabled = true; }; const _ORIG_beginQuiz = window.beginQuiz; window.beginQuiz = function(){ const badge = document.getElementById('quiz-streak-counter'); if(badge){ badge.style.display='none'; const n=document.getElementById('quiz-streak-num'); if(n) n.textContent='0'; } refreshHintsUI(); _ORIG_beginQuiz && _ORIG_beginQuiz.apply(this,arguments); }; const _ORIG_renderQ = window.renderQ; window.renderQ = function(){ window.__earnHintFiredThisAnswer = false; _ORIG_renderQ && _ORIG_renderQ.apply(this,arguments); refreshHintsUI(); }; window.animateMedalStars = function(earned){ const container = document.getElementById('c-medal-stars'); if(!container) return; container.innerHTML = ''; const total = 3; function playStarSound(i){ try{ const ctx = new (window.AudioContext||window.webkitAudioContext)(); const notes = [523.25, 659.25, 880]; const freq = notes[Math.min(i, notes.length-1)]; const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(freq * 0.55, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.07); g.gain.setValueAtTime(0.0001, ctx.currentTime); g.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.30); o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.32); const o2 = ctx.createOscillator(), g2 = ctx.createGain(); o2.type = 'sine'; o2.frequency.value = freq * 2.5; g2.gain.setValueAtTime(0.0001, ctx.currentTime); g2.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02); g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18); o2.connect(g2); g2.connect(ctx.destination); o2.start(ctx.currentTime); o2.stop(ctx.currentTime + 0.2); }catch(e){} } for(let i = 0; i < total; i++){ const delay = i * 240; setTimeout(()=>{ const span = document.createElement('span'); span.textContent = '🧠'; span.style.cssText = 'margin:0 4px;display:inline-block;font-size:28px;'; if(i < earned){ span.className = 'brain-anim'; span.style.color = '#ffe040'; playStarSound(i); try{ navigator.vibrate && navigator.vibrate(i === earned-1 && earned === 3 ? 45 : 18); }catch(e){} } else { span.className = 'brain-anim dimmed'; span.style.color = '#666'; } container.appendChild(span); }, delay); } }; document.addEventListener('DOMContentLoaded', function(){ refreshHintsUI(); const layer = document.getElementById('emotion-layer'); if(!layer) return; let startY = 0; layer.addEventListener('touchstart', function(e){ startY = e.touches[0].clientY; }, {passive: true}); layer.addEventListener('touchmove', function(e){ const dy = e.touches[0].clientY - startY; if(dy < -10){ const card = layer.querySelector('.emotion-card'); if(card) card.style.transform = 'translateY('+Math.min(0,dy)+'px)'; } }, {passive: true}); layer.addEventListener('touchend', function(e){ const dy = e.changedTouches[0].clientY - startY; const card = layer.querySelector('.emotion-card'); if(dy < -30){ if(card){ card.classList.add('hide'); } setTimeout(()=>{ layer.classList.remove('active','dismissable'); layer.innerHTML=''; }, 280); } else { if(card) card.style.transform = ''; } }, {passive: true}); }); document.addEventListener('DOMContentLoaded', refreshHintsUI); })();
;

/* === split-question-system === */

;


(function(){
'use strict';
function isSplit(q){
  return !!(q && typeof q.blank==='string' && q.blank.includes('/'));
}
function cleanPart(s){ return String(s||'').trim(); }
function getValidIndexes(q){
  if(q && Array.isArray(q.validAns)) return q.validAns.slice();
  return [q.ans];
}
function getParts(opt){
  const t=String(opt||'').trim();
  if(/^both work$/i.test(t)||!t.includes('/')) return null;
  return t.split('/').map(cleanPart);
}
function getValidPairs(q){
  const pairs=[]; const valid=getValidIndexes(q);
  valid.forEach(i=>{ const p=getParts(q.opts[i]); if(p&&p.length>=2) pairs.push([p[0],p[1]]); });
  valid.forEach(i=>{ if(/^both work$/i.test(String(q.opts[i]||''))){ q.opts.forEach(o=>{ const p=getParts(o); if(p&&p.length>=2) pairs.push([p[0],p[1]]); }); }});
  if(!pairs.length){ const p=String(q.blank||'').split('/').map(cleanPart); if(p.length>=2) pairs.push([p[0],p[1]]); }
  return pairs;
}
function uniq(arr){ const s=new Set(); return arr.filter(x=>{ const k=String(x).toLowerCase(); if(s.has(k))return false; s.add(k); return true; }); }
function getState(){ if(!window.__sq) window.__sq={active:false,step:0,answers:[],wrong:false,parts:0,opts:[]}; return window.__sq; }
function isPartOk(q,step,val,prev){
  const pairs=getValidPairs(q);
  return pairs.some(p=>{ if(step===0) return String(p[0]).toLowerCase()===String(val).toLowerCase(); const ok=!prev||String(p[0]).toLowerCase()===String(prev).toLowerCase(); return ok&&String(p[1]).toLowerCase()===String(val).toLowerCase(); })||pairs.some(p=>String(p[step]).toLowerCase()===String(val).toLowerCase());
}
function mkBtn(text,i){
  const letters=['A','B','C','D','E','F'];
  const b=document.createElement('button'); b.className='opt';
  b.innerHTML='<span class="ol">'+(letters[i]||i+1)+'</span><span>'+text+'</span>';
  b.onclick=()=>window.selectAns(i); return b;
}
function renderBlanks(q){
  const blanks=(q.en.match(/___/g)||[]).length;
  const parts=q.en.split('___');
  let html;
  if(blanks>=2){
    html=parts[0]+'<span class="blank split-blank active" id="sq-b0">___</span>'+(parts[1]||'')+'<span class="blank split-blank" id="sq-b1">___</span>'+(parts.slice(2).join('___')||'');
  } else {
    html=parts[0]+'<span class="blank split-blank active" id="sq-b0">___</span>'+(parts[1]||'');
  }
  const el=document.getElementById('q-en'); if(el) el.innerHTML=html;
}
function renderOpts(q,step){
  const optsEl=document.getElementById('q-opts'); if(!optsEl) return;
  const pairs=getValidPairs(q);
  let options=uniq(q.opts.map(getParts).filter(Boolean).map(p=>p[step]).filter(Boolean));
  pairs.forEach(p=>{ if(p[step]) options.push(p[step]); }); options=uniq(options);
  const st=getState(); st.opts=options;
  optsEl.innerHTML=''; options.forEach((t,i)=>optsEl.appendChild(mkBtn(t,i)));
  const fb=document.getElementById('q-fb'); if(fb){fb.className='fb-box';fb.innerHTML='';}
  const nx=document.getElementById('btn-next'); if(nx) nx.className='btn-next';
  const bh=document.getElementById('btn-hint'); if(bh) bh.disabled=(typeof getHints==='function'?getHints():0)<=0;
}
function showNext(){
  const nx=document.getElementById('btn-next'); if(nx) nx.className='btn-next show';
  const bh=document.getElementById('btn-hint'); if(bh) bh.disabled=true;
}
// Override renderQ
const _rQ=window.renderQ;
window.renderQ=function(){
  _rQ&&_rQ.apply(this,arguments);
  const q=currentLevel&&currentLevel.qs[currentQIndex];
  if(!isSplit(q)){ window.__sq={active:false,step:0,answers:[],wrong:false,parts:0,opts:[]}; return; }
  const ex=window.__sq;
  if(ex&&ex.active&&ex.step>0) return; // mid-question
  answered=false;
  window.__sq={active:true,step:0,answers:[],wrong:false,parts:0,opts:[]};
  renderBlanks(q);
  renderOpts(q,0);
  // Double-fire to win over any async re-render
  setTimeout(()=>{ renderBlanks(q); renderOpts(q,0); },0);
};
// Override selectAns
const _sA=window.selectAns;
window.selectAns=function(idx){
  const q=currentLevel&&currentLevel.qs[currentQIndex];
  if(!isSplit(q)){
    // Non-split: delegate to chain
    const bh=typeof getHints==='function'?getHints():0;
    _sA&&_sA.apply(this,arguments);
    if(!answered){
      const valid=getValidIndexes(q);
      if(!valid.includes(idx)&&bh>=5){
        const btns=document.querySelectorAll('#q-opts .opt');
        if(typeof earnHint==='function') earnHint(btns[idx]||null);
      }
    }
    return;
  }
  const st=getState();
  if(!st.active||answered) return;
  // If state isn't ready (renderOpts didn't fire yet), re-init and bail
  if(!st.opts||st.opts.length===0){ renderBlanks(q); renderOpts(q,st.step||0); return; }
  const fb=document.getElementById('q-fb');
  const opts=Array.from(document.querySelectorAll('#q-opts .opt'));
  // Read chosen directly from button text for robustness
  const _btns=Array.from(document.querySelectorAll('#q-opts .opt'));
  const _btn=_btns[idx];
  const chosen=_btn ? (_btn.querySelector('span:last-child')||_btn).textContent.trim() : (st.opts[idx]||'');
  const step=st.step;
  const ok=isPartOk(q,step,chosen,st.answers[0]);
  const blank=document.getElementById('sq-b'+step);
  if(blank){ blank.textContent=chosen; blank.classList.remove('active'); blank.classList.add(ok?'filled-ok':'filled-ko'); }
  opts.forEach((b,i)=>{ b.classList.add('disabled'); const v=st.opts[i]; if(isPartOk(q,step,v,st.answers[0])) b.classList.add('correct'); });
  if(opts[idx]) opts[idx].classList.add(ok?'correct':'wrong');
  const qCard=document.querySelector('.q-card');
  if(ok){
    sessionCorrectStreak++; sessionMaxCorrectStreak=Math.max(sessionMaxCorrectStreak,sessionCorrectStreak);
    if(typeof calculateDynamicGain==='function') calculateDynamicGain(true,opts[idx]||null);
    if(typeof SFX!=='undefined'&&SFX.correct) SFX.correct();
    if(fb){ fb.className='fb-box ok show'; fb.innerHTML=step===0?'✅ ¡Bien! Ahora la segunda parte.':'✅ ¡Correcto! '+q.tip; }
    if(qCard){qCard.classList.remove('flash-green','flash-red');void qCard.offsetWidth;qCard.classList.add('flash-green');}
    if(sessionCorrectStreak===3&&typeof showPhilosophy==='function') showPhilosophy('correct3');
    if(sessionCorrectStreak===5&&typeof showPhilosophy==='function') showPhilosophy('correct5');
  } else {
    sessionCorrectStreak=0; sessionWrongStreak++; sessionHadWrong=true;
    if(fb){ fb.className='fb-box ko show'; fb.innerHTML='✨ Casi. '+q.tip; }
    if(qCard){qCard.classList.remove('flash-green','flash-red');void qCard.offsetWidth;qCard.classList.add('flash-red');}
    // Earn hint on wrong
    const n=typeof getHints==='function'?getHints():0;
    if(n<5&&typeof earnHint==='function') earnHint(opts[idx]||null);
    else if(typeof animateHintCounter==='function') animateHintCounter();
  }
  st.answers[step]=chosen; if(ok) st.parts++; else st.wrong=true;
  if(step===0){
    st.step=1;
    // Show btn-next so user can skip if step 1 breaks
    showNext();
    setTimeout(()=>{
      // Inject second blank if sentence only has 1 ___
      if(!document.getElementById('sq-b1')){
        const en=document.getElementById('q-en');
        if(en){ const sp=document.createElement('span'); sp.className='blank split-blank active'; sp.id='sq-b1'; sp.textContent='___'; en.appendChild(document.createTextNode(' ')); en.appendChild(sp); }
      } else { const b1=document.getElementById('sq-b1'); if(b1) b1.classList.add('active'); }
      renderOpts(q,1);
      // If no options, keep btn-next visible
      const oe=document.getElementById('q-opts');
      if(!oe||oe.children.length===0) showNext();
    },700);
    return;
  }
  // Step 1 complete
  answered=true;
  try{
    const allOk=!st.wrong&&st.parts>=2;
    if(allOk){ sessionCorrect++; const wb=sessionWrongStreak>=2; sessionWrongStreak=0; if(wb&&typeof showPhilosophy==='function') showPhilosophy('recuperación'); }
    else { if(sessionWrongStreak===2&&typeof showPhilosophy==='function') showPhilosophy('wrong2'); if(sessionWrongStreak===5&&typeof showPhilosophy==='function') showPhilosophy('wrong5'); const c=3+Math.floor(Math.random()*6); if(typeof addSessionXp==='function') addSessionXp(c,'Intento',null); }
  }catch(e){}
  showNext();
};
// Override useHint for split
const _uH=window.useHint;
window.useHint=function(){
  const q=currentLevel&&currentLevel.qs[currentQIndex];
  const st=getState();
  if(isSplit(q)&&st.active&&!answered){
    const n=typeof getHints==='function'?getHints():(state&&state.hints||0);
    if(n<=0) return;
    if(typeof setHints==='function') setHints(n-1); else if(state) state.hints=Math.max(0,n-1);
    if(typeof saveState==='function') saveState();
    if(typeof refreshHintsUI==='function') refreshHintsUI();
    const pairs=getValidPairs(q);
    const answer=pairs[0]&&pairs[0][st.step]?pairs[0][st.step]:String(q.blank).split('/')[st.step].trim();
    const toast=document.getElementById('hint-toast'); const text=document.getElementById('hint-toast-text');
    if(toast&&text){ text.textContent='💡 Pista: esta parte puede ser "'+answer+'".'; toast.classList.remove('show'); void toast.offsetWidth; toast.classList.add('show'); clearTimeout(toast._t); toast._t=setTimeout(()=>toast.classList.remove('show'),5000); }
    return;
  }
  _uH&&_uH.apply(this,arguments);
};
})();

;

/* === a-start-adventure-safe-final === */

;

(function(){
  'use strict';
  window.startAdventureSafe = function(ev){
    try{ if(ev && ev.preventDefault) ev.preventDefault(); }catch(e){}
    try{ if(window.SFX && typeof window.SFX.start === 'function') window.SFX.start(); }catch(e){}
    try{
      if(typeof window.goToMap === 'function'){
        window.goToMap();
        return false;
      }
      if(typeof window.show === 'function'){
        window.show('screen-map');
        return false;
      }
      document.querySelectorAll('.screen').forEach(function(s){
        s.classList.remove('active');
      });
      var map = document.getElementById('screen-map');
      if(map) map.classList.add('active');
    }catch(e){
      console.error('Error al comenzar aventura:', e);
    }
    return false;
  };
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.btn-start').forEach(function(btn){
      if((btn.textContent || '').toLowerCase().includes('comenzar aventura')){
        btn.onclick = window.startAdventureSafe;
        btn.style.pointerEvents = 'auto';
      }
    });
  });
})();

;

/* === englishxp-brain-counter-v1 === */

;

(function () {
  'use strict';
  function clamp(n) {
    n = Number(n);
    return (!Number.isFinite(n)) ? 0 : Math.max(0, Math.min(3, Math.round(n)));
  }
  function safe(fn, fb) { try { return fn(); } catch (e) { return fb; } }
  function medalOf(level) {
    return clamp(safe(function () {
      if (typeof window.getMedal === 'function') return window.getMedal(level);
      if (typeof getMedal === 'function') return getMedal(level);
      if (typeof state !== 'undefined' && state && state.medals &&
          typeof levelKey === 'function') return state.medals[levelKey(level)] || 0;
      return 0;
    }, 0));
  }

  function makeBrainBar(earned) {
    earned = clamp(earned);
    var bar = document.createElement('div');
    bar.className = 'a-clean-brains-bar earned-' + earned;
    bar.setAttribute('aria-label', earned + ' de 3 cerebros');
    for (var i = 0; i < earned; i++) {
      var b = document.createElement('span');
      b.className = 'a-clean-brain';
      b.textContent = '🧠';
      bar.appendChild(b);
    }
    return bar;
  }

  function ensureTopbar() {
    var map = document.getElementById('screen-map');
    if (!map) return null;
    var wallet = map.querySelector('.xp-wallet-map');
    if (!wallet) {
      var topbar = map.querySelector('.topbar');
      if (!topbar) return null;
      wallet = document.createElement('div');
      wallet.className = 'xp-wallet xp-wallet-map';
      topbar.appendChild(wallet);
    }

    var brainBox = wallet.querySelector('.topbar-brains');
    if (!brainBox) {
      brainBox = document.createElement('div');
      brainBox.className = 'topbar-brains';
      brainBox.innerHTML = '🧠 <span id="brain-count-display">0</span>';
      wallet.insertBefore(brainBox, wallet.firstChild);
    }

    var hintsBox = wallet.querySelector('.topbar-hints-map');
    if (!hintsBox) {
      hintsBox = document.createElement('div');
      hintsBox.className = 'topbar-hints-map';
      hintsBox.innerHTML = '💡 <span id="topbar-hints-map-count">0</span>';
      wallet.insertBefore(hintsBox, wallet.firstChild);
    }
    var countEl = document.getElementById('brain-count-display');
    if (!countEl) {
      countEl = document.createElement('span');
      countEl.id = 'brain-count-display';
      brainBox.appendChild(countEl);
    }
    return countEl;
  }
  function getHintsCount() {
    return safe(function () {
      if (typeof getHints === 'function') return getHints();
      if (typeof state !== 'undefined' && state && typeof state.hints === 'number') return state.hints;
      return 0;
    }, 0);
  }
  var _running = false;
  function renderBrains() {
    if (_running) return;
    _running = true;
    try {
      var map = document.getElementById('screen-map');
      if (!map) return;
      var pairs = [];
      safe(function () {
        if (typeof WORLDS === 'undefined' || !Array.isArray(WORLDS)) return;
        WORLDS.forEach(function (world, wi) {
          if (!world || !Array.isArray(world.levels)) return;
          var worldLocked = safe(function () {
            return typeof isUnlocked === 'function' ? !isUnlocked(wi, 0) : false;
          }, false);
          if (worldLocked) return;
          world.levels.forEach(function (level) { pairs.push({ level: level }); });
        });
      }, null);
      var rows = Array.prototype.slice.call(
        map.querySelectorAll('.world-block:not(.locked-world) .level-row')
      );
      var total = 0;
      rows.forEach(function (row, i) {
        var earned = pairs[i] ? medalOf(pairs[i].level) : 0;
        total += earned;
        row.querySelectorAll('.a-clean-brains-bar').forEach(function (el) { el.remove(); });
        if (earned > 0) {
          var bar = makeBrainBar(earned);
          row.appendChild(bar);
        }
      });

      var countEl = ensureTopbar();
      if (countEl) countEl.textContent = String(total);
      var hintsEl = document.getElementById('topbar-hints-map-count');
      if (hintsEl) hintsEl.textContent = String(Math.max(0, getHintsCount()));
      window.totalBrainsEarned = total;
    } finally {
      _running = false;
    }
  }
  var _timer = null;
  function schedule() {
    clearTimeout(_timer);
    _timer = setTimeout(renderBrains, 120);
  }

  var _origRefreshHints = null;
  function hookRefreshHints() {
    if (typeof window.refreshHintsUI === 'function' && !window.__exHintsMapHooked) {
      window.__exHintsMapHooked = true;
      var orig = window.refreshHintsUI;
      window.refreshHintsUI = function () {
        var r = orig.apply(this, arguments);
        var el = document.getElementById('topbar-hints-map-count');
        if (el) el.textContent = String(Math.max(0, getHintsCount()));
        return r;
      };
    }
  }
  ['renderMap', 'goToMap', 'finishLevel', 'saveProgress', 'loadProgress'].forEach(function (name) {
    if (typeof window[name] !== 'function') return;
    var marker = '__exBrainHooked_' + name;
    if (window[marker]) return;
    window[marker] = true;
    var orig = window[name];
    window[name] = function () {
      var result = orig.apply(this, arguments);
      schedule();
      return result;
    };
  });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      hookRefreshHints();
      setTimeout(renderBrains, 250);
    });
  } else {
    hookRefreshHints();
    setTimeout(renderBrains, 250);
  }
  window.renderBrains = renderBrains;
})();

;

/* === a-final-real-brain-counter-fix === */

;

(function(){
  'use strict';
  function clampBrain(n){
    n = Number(n);
    return Number.isFinite(n) ? Math.max(0, Math.min(3, Math.round(n))) : 0;
  }
  function getMedalForLevel(level){
    try{
      if(typeof getMedal === 'function') return clampBrain(getMedal(level));
    }catch(e){}
    try{
      if(typeof state !== 'undefined' && state && state.medals && typeof levelKey === 'function'){
        return clampBrain(state.medals[levelKey(level)] || 0);
      }
    }catch(e){}
    return 0;
  }
  function getRealTotalBrains(){
    var total = 0;
    try{
      if(typeof WORLDS !== 'undefined' && Array.isArray(WORLDS)){
        WORLDS.forEach(function(world){
          if(!world || !Array.isArray(world.levels)) return;
          world.levels.forEach(function(level){ total += getMedalForLevel(level); });
        });
      }
    }catch(e){}
    return Math.max(0, total);
  }
  function ensureBrainCounter(){
    var map = document.getElementById('screen-map');
    if(!map) return null;
    var wallet = map.querySelector('.xp-wallet-map') || map.querySelector('.xp-wallet');
    if(!wallet){
      var topbar = map.querySelector('.topbar');
      if(!topbar) return null;
      wallet = document.createElement('div');
      wallet.className = 'xp-wallet xp-wallet-map';
      topbar.appendChild(wallet);
    }
    var pill = wallet.querySelector('.topbar-brains');
    if(!pill){
      pill = document.createElement('div');
      pill.className = 'topbar-brains';
      pill.innerHTML = '🧠 <span id="brain-count-display">0</span>';
      wallet.insertBefore(pill, wallet.firstChild);
    }
    var n = pill.querySelector('#brain-count-display') || document.getElementById('brain-count-display');
    if(!n){
      n = document.createElement('span');
      n.id = 'brain-count-display';
      pill.appendChild(n);
    }
    return n;
  }
  function updateBrainCounter(){
    var n = ensureBrainCounter();
    if(!n) return;
    var total = getRealTotalBrains();
    n.textContent = String(total);
    window.totalBrainsEarned = total;
  }
  function updateHintsPills(){
    var h = 0;
    try{
      if(typeof getHints === 'function') h = getHints();
      else if(typeof state !== 'undefined' && state && typeof state.hints === 'number') h = state.hints;
    }catch(e){}
    h = Math.max(0, Number(h) || 0);
    ['topbar-hints-map-count','topbar-hints-count','hints-available'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.textContent = String(h);
    });
  }
  var timer = null;
  function scheduleCounters(){
    clearTimeout(timer);
    timer = setTimeout(function(){ updateBrainCounter(); updateHintsPills(); }, 60);
  }
  ['renderMap','goToMap','finishLevel','saveState','saveProgress','loadProgress','refreshHintsUI'].forEach(function(name){
    try{
      if(typeof window[name] !== 'function' || window[name].__aCounterFinalHook) return;
      var original = window[name];
      var wrapped = function(){
        var r = original.apply(this, arguments);
        scheduleCounters();
        return r;
      };
      wrapped.__aCounterFinalHook = true;
      window[name] = wrapped;
    }catch(e){}
  });
  document.addEventListener('visibilitychange', scheduleCounters);
  document.addEventListener('DOMContentLoaded', scheduleCounters);
  window.addEventListener('focus', scheduleCounters);
  setInterval(scheduleCounters, 900);
  scheduleCounters();
  window.updateBrainCounter = updateBrainCounter;
  window.getRealTotalBrains = getRealTotalBrains;
})();

;

/* === a-topbar-level-minds-final-js === */

;

(function(){
  'use strict';
  function clamp(n){ n=Number(n); return Number.isFinite(n)?Math.max(0,Math.min(3,Math.round(n))):0; }
  function medal(level){
    try{ if(typeof window.getMedal==='function') return clamp(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal==='function') return clamp(getMedal(level)); }catch(e){}
    try{ if(typeof state!=='undefined' && state && state.medals && typeof levelKey==='function') return clamp(state.medals[levelKey(level)]||0); }catch(e){}
    return 0;
  }
  function totalBrains(){
    var total=0;
    try{ if(Array.isArray(WORLDS)) WORLDS.forEach(function(w){ (w.levels||[]).forEach(function(l){ total+=medal(l); }); }); }catch(e){}
    return total;
  }
  function ensureWallet(){
    var map=document.getElementById('screen-map'); if(!map) return null;
    var topbar=map.querySelector('.topbar'); if(!topbar) return null;
    var wallet=topbar.querySelector('.xp-wallet-map') || topbar.querySelector('.xp-wallet');
    if(!wallet){ wallet=document.createElement('div'); wallet.className='xp-wallet xp-wallet-map'; topbar.appendChild(wallet); }
    wallet.classList.add('xp-wallet-map');
    var brain=wallet.querySelector('.topbar-brains');
    if(!brain){ brain=document.createElement('div'); brain.className='topbar-brains'; brain.innerHTML='🧠 <span id="brain-count-display">0</span>'; }
    var xp=wallet.querySelector('.topbar-xp');
    if(!xp){ xp=document.createElement('div'); xp.className='topbar-xp'; xp.innerHTML='XP <span id="xp-balance-display">0</span>'; }
    var hints=wallet.querySelector('.topbar-hints-map') || wallet.querySelector('.topbar-hints') || document.getElementById('topbar-hints');
    if(!hints){ hints=document.createElement('div'); hints.className='topbar-hints-map'; hints.innerHTML='💡 <span id="topbar-hints-map-count">0</span>'; }
    hints.classList.add('topbar-hints-map');
    wallet.innerHTML='';
    wallet.appendChild(brain); wallet.appendChild(xp); wallet.appendChild(hints);
    return wallet;
  }
  function hintsCount(){
    try{ if(typeof getHints==='function') return Math.max(0,Number(getHints())||0); }catch(e){}
    try{ if(typeof state!=='undefined' && state) return Math.max(0,Number(state.hints)||0); }catch(e){}
    return 0;
  }
  function paintCounters(){
    ensureWallet();
    var b=document.getElementById('brain-count-display'); if(b) b.textContent=String(totalBrains());
    var x=document.getElementById('xp-balance-display'); try{ if(x && typeof state!=='undefined' && state) x.textContent=String(Number(state.xpBalance)||0); }catch(e){}
    var h=document.getElementById('topbar-hints-map-count'); if(h) h.textContent=String(hintsCount());
  }
  function mindBar(count){
    var bar=document.createElement('div'); bar.className='a-level-minds'; bar.setAttribute('aria-label',count+' de 3 cerebros ganados');
    for(var i=0;i<count;i++){ var s=document.createElement('span'); s.className='a-level-mind'; s.textContent='🧠'; bar.appendChild(s); }
    return bar;
  }
  function paintLevelMinds(){
    var map=document.getElementById('screen-map'); if(!map) return;
    try{
      var blocks=Array.prototype.slice.call(map.querySelectorAll('.world-block'));
      if(!Array.isArray(WORLDS)) return;
      WORLDS.forEach(function(world,wi){
        var block=blocks[wi]; if(!block || block.classList.contains('locked-world')) return;
        var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
        (world.levels||[]).forEach(function(level,li){
          var row=rows[li]; if(!row) return;
          row.querySelectorAll('.a-level-minds,.a-clean-brains-bar').forEach(function(el){ el.remove(); });
          var got=medal(level);
          if(got>0){
            var badge=row.querySelector('.lv-badge');
            if(badge){ badge.innerHTML=''; badge.appendChild(mindBar(got)); }
            else row.appendChild(mindBar(got));
          }
          row.classList.toggle('a-clean-mastered', got===3);
        });
      });
    }catch(e){}
  }
  var t=null;
  function refresh(){ clearTimeout(t); t=setTimeout(function(){ paintCounters(); paintLevelMinds(); },80); }
  ['renderMap','goToMap','finishLevel','saveState','saveProgress','loadProgress','refreshHintsUI','selectAns','nextQ'].forEach(function(name){
    try{
      if(typeof window[name] !== 'function' || window[name].__aTopbarMindsHook) return;
      var original=window[name];
      var wrapped=function(){ var r=original.apply(this,arguments); refresh(); return r; };
      wrapped.__aTopbarMindsHook=true; window[name]=wrapped;
    }catch(e){}
  });
  document.addEventListener('DOMContentLoaded',refresh);
  window.addEventListener('focus',refresh);
  setInterval(refresh,1000);
  refresh();
  window.aRefreshTopbarAndLevelMinds=refresh;
})();

;

/* === a-start-adventure-emergency-fix === */

;

(function(){
  'use strict';
  function forceScreen(id){
    document.querySelectorAll('.screen').forEach(function(screen){
      screen.classList.remove('active');
      screen.style.display = '';
    });
    var target = document.getElementById(id);
    if(target){
      target.classList.add('active');
      target.style.display = 'flex';
    }
  }
  function safeMapPaint(){
    try{ if(typeof window.renderMap === 'function') window.renderMap(); }catch(e){ console.warn('renderMap falló, se abre mapa igual:', e); }
    try{ if(typeof window.updateAllMascots === 'function') window.updateAllMascots(); }catch(e){}
    try{ if(typeof window.aRefreshTopbarAndLevelMinds === 'function') window.aRefreshTopbarAndLevelMinds(); }catch(e){}
  }
  window.startAdventureSafe = function(ev){
    try{ if(ev){ ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); } }catch(e){}
    try{ if(window.SFX && typeof window.SFX.start === 'function') window.SFX.start(); }catch(e){}
    safeMapPaint();
    try{
      if(typeof window.show === 'function'){
        window.show('screen-map');
      }else{
        forceScreen('screen-map');
      }
    }catch(e){
      forceScreen('screen-map');
    }
    setTimeout(safeMapPaint, 80);
    return false;
  };
  function bindStartButton(){
    document.querySelectorAll('.btn-start').forEach(function(btn){
      if((btn.textContent || '').toLowerCase().indexOf('comenzar aventura') !== -1){
        btn.onclick = window.startAdventureSafe;
        btn.style.pointerEvents = 'auto';
        btn.style.position = 'relative';
        btn.style.zIndex = '50';
      }
    });
  }
  document.addEventListener('click', function(ev){
    var btn = ev.target && ev.target.closest ? ev.target.closest('.btn-start') : null;
    if(btn && (btn.textContent || '').toLowerCase().indexOf('comenzar aventura') !== -1){
      window.startAdventureSafe(ev);
    }
  }, true);
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindStartButton);
  else bindStartButton();
  setTimeout(bindStartButton, 250);
})();

;

/* === a-buttons-ideas-final-fix === */

;

(function(){
  'use strict';
  function byId(id){ return document.getElementById(id); }
  function call(name){
    var fn = window[name];
    if(typeof fn === 'function'){
      try { return fn.apply(window, Array.prototype.slice.call(arguments,1)); }
      catch(e){ console.warn('[EnglishXP] Falló '+name, e); }
    }
  }
  function showScreen(id){
    if(typeof window.show === 'function') { try { window.show(id); return; } catch(e){} }
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); s.style.display=''; });
    var el=byId(id); if(el){ el.classList.add('active'); el.style.display='flex'; }
  }
  function refresh(){
    try{ if(typeof window.renderMap === 'function') window.renderMap(); }catch(e){}
    try{ if(typeof window.refreshHintsUI === 'function') window.refreshHintsUI(); }catch(e){}
    try{ if(typeof window.aRefreshTopbarAndLevelMinds === 'function') window.aRefreshTopbarAndLevelMinds(); }catch(e){}
    setTimeout(fixIdeasCounter,0);
    setTimeout(bindDynamicRows,0);
  }
  window.startAdventureSafe = function(ev){
    try{ if(ev){ ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); } }catch(e){}
    try{ if(window.SFX && typeof window.SFX.start === 'function') window.SFX.start(); }catch(e){}
    showScreen('screen-map');
    refresh();
    return false;
  };
  function getHints(){
    try{ if(window.state && Number.isFinite(Number(window.state.hints))) return Number(window.state.hints); }catch(e){}
    try{ if(typeof state !== 'undefined' && state && Number.isFinite(Number(state.hints))) return Number(state.hints); }catch(e){}
    var old=byId('topbar-hints-count') || byId('hints-count') || byId('hint-count');
    var n=old ? parseInt(old.textContent,10) : 0;
    return Number.isFinite(n) ? n : 0;
  }
  function ensureWallet(){
    var map=byId('screen-map'); if(!map) return null;
    var topbar=map.querySelector('.topbar'); if(!topbar) return null;
    var wallet=topbar.querySelector('.xp-wallet-map') || topbar.querySelector('.xp-wallet');
    if(!wallet){ wallet=document.createElement('div'); wallet.className='xp-wallet xp-wallet-map'; topbar.appendChild(wallet); }
    wallet.classList.add('xp-wallet-map');
    return wallet;
  }
  function fixIdeasCounter(){
    var wallet=ensureWallet(); if(!wallet) return;
    var hints=wallet.querySelector('.topbar-hints');
    if(!hints){ hints=document.createElement('div'); hints.className='topbar-hints'; wallet.appendChild(hints); }
    hints.innerHTML='<span class="idea-bulb" aria-hidden="true">💡</span><span class="topbar-hints-count" id="topbar-hints-count">'+getHints()+'</span>';
    hints.setAttribute('aria-label', getHints() + ' ideas disponibles');
    var xp=wallet.querySelector('.topbar-xp');
    var brain=wallet.querySelector('.topbar-brains');
    if(brain && xp && brain.nextElementSibling!==xp) wallet.insertBefore(brain, wallet.firstChild);
    if(xp && hints && xp.nextElementSibling!==hints) wallet.insertBefore(hints, xp.nextSibling);
  }
  function bindStaticButtons(){
    document.querySelectorAll('.btn-start').forEach(function(b){ b.onclick=window.startAdventureSafe; });
    document.querySelectorAll('.back-soft').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); showScreen('screen-welcome'); return false; }; });
    document.querySelectorAll('.quiz-exit').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); return call('exitQuiz')!==undefined ? false : (showScreen('screen-map'), false); }; });
    document.querySelectorAll('.btn-quiz-customize,[onclick="openWardrobe()"]').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); call('openWardrobe'); return false; }; });
    var hint=byId('btn-hint'); if(hint) hint.onclick=function(ev){ ev.preventDefault(); call('useHint'); fixIdeasCounter(); return false; };
    var next=byId('btn-next'); if(next) next.onclick=function(ev){ ev.preventDefault(); call('nextQ'); return false; };
    var startQuiz=byId('btn-start-quiz'); if(startQuiz) startQuiz.onclick=function(ev){ ev.preventDefault(); call('beginQuiz'); return false; };
    document.querySelectorAll('.lesson-back').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); call('goToMap'); refresh(); return false; }; });
    document.querySelectorAll('.wardrobe-back').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); call('closeWardrobe'); return false; }; });
    var cont=byId('btn-continue'); if(cont) cont.onclick=function(ev){ ev.preventDefault(); call('continueFromComplete'); refresh(); return false; };
    document.querySelectorAll('.btn-save').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); call('goToMap'); refresh(); return false; }; });
  }
  function bindDynamicRows(){
    try{
      var blocks=Array.prototype.slice.call(document.querySelectorAll('#screen-map .world-block'));
      blocks.forEach(function(block, wi){
        var header=block.querySelector('.world-header');
        if(header && !block.classList.contains('locked-world')){
          header.onclick=function(ev){ ev.preventDefault(); block.classList.toggle('open'); return false; };
        }
        var world=(window.WORLDS && window.WORLDS[wi]) || (typeof WORLDS!=='undefined' && WORLDS[wi]);
        if(!world || !Array.isArray(world.levels)) return;
        var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
        rows.forEach(function(row, li){
          var level=world.levels[li];
          if(!level || row.classList.contains('locked')) return;
          row.onclick=function(ev){ ev.preventDefault(); ev.stopPropagation(); call('startLevel', level, world); return false; };
          row.style.cursor='pointer';
        });
      });
    }catch(e){ console.warn('[EnglishXP] No pude reconectar niveles', e); }
  }
  document.addEventListener('click', function(ev){
    var t=ev.target && ev.target.closest ? ev.target.closest('button,.world-header,.level-row,.witem,.skin-action') : null;
    if(!t) return;
    // Last-resort rescue for inline handlers that were overwritten by previous visual patches.
    if(t.matches('.btn-start')) return window.startAdventureSafe(ev);
    if(t.matches('.topbar-hints')) { fixIdeasCounter(); return; }
  }, true);
  var oldRender=window.renderMap;
  if(typeof oldRender === 'function' && !oldRender.__aButtonsIdeasWrapped){
    window.renderMap=function(){
      var r=oldRender.apply(this, arguments);
      setTimeout(function(){ fixIdeasCounter(); bindStaticButtons(); bindDynamicRows(); },0);
      return r;
    };
    window.renderMap.__aButtonsIdeasWrapped=true;
  }
  function boot(){ bindStaticButtons(); fixIdeasCounter(); bindDynamicRows(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  setTimeout(boot,250);
  setTimeout(boot,900);
})();

;

/* === a-global-buttons-sound-fix === */

;

(function(){
  'use strict';
  var A = window.AButtonSystem = window.AButtonSystem || {};
  var audioCtx = null;
  function ctx(){
    try{
      var C = window.AudioContext || window.webkitAudioContext;
      if(!C) return null;
      if(!audioCtx) audioCtx = new C();
      if(audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }catch(e){ return null; }
  }
  function tone(freq, dur, type, gain, delay){
    var c = ctx(); if(!c) return;
    delay = delay || 0;
    var now = c.currentTime + delay;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(gain || 0.055, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g); g.connect(c.destination);
    o.start(now); o.stop(now + dur + 0.025);
  }
  A.sound = function(kind){
    try{
      if(kind === 'back'){ tone(440,.10,'triangle',.045); tone(330,.12,'triangle',.035,.055); return; }
      if(kind === 'start'){ tone(523,.10,'sine',.055); tone(659,.11,'sine',.050,.055); tone(880,.13,'sine',.045,.11); return; }
      if(kind === 'success'){ tone(660,.11,'triangle',.060); tone(990,.14,'triangle',.050,.07); return; }
      if(kind === 'hint'){ tone(1047,.12,'sine',.055); tone(784,.16,'sine',.040,.075); return; }
      if(kind === 'error'){ tone(190,.13,'sawtooth',.035); return; }
      tone(620,.065,'sine',.040); tone(930,.06,'sine',.026,.035);
    }catch(e){}
  };
  function byId(id){ return document.getElementById(id); }
  function fn(name){ return typeof window[name] === 'function' ? window[name] : null; }
  function safeCall(name){
    var f = fn(name);
    if(!f) return false;
    try{ f.apply(window, Array.prototype.slice.call(arguments,1)); return true; }
    catch(e){ console.warn('[EnglishXP] botón falló:', name, e); return false; }
  }
  function forceScreen(id){
    try{ if(fn('show')){ window.show(id); return; } }catch(e){}
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); s.style.display='none'; });
    var el = byId(id);
    if(el){ el.classList.add('active'); el.style.display='flex'; }
  }
  function refreshAll(){
    try{ if(fn('saveState')) window.saveState(); }catch(e){}
    try{ if(fn('refreshHintsUI')) window.refreshHintsUI(); }catch(e){}
    try{ if(fn('aRefreshTopbarAndLevelMinds')) window.aRefreshTopbarAndLevelMinds(); }catch(e){}
    try{ fixIdeasCounter(); }catch(e){}
    setTimeout(function(){ try{ bindAll(); }catch(e){} }, 0);
  }
  function goMap(){
    if(!safeCall('goToMap')) forceScreen('screen-map');
    refreshAll();
  }
  function goWelcome(){ forceScreen('screen-welcome'); refreshAll(); }
  function openWardrobeSafe(){ if(!safeCall('openWardrobe')) forceScreen('screen-wardrobe'); refreshAll(); }
  function closeWardrobeSafe(){ if(!safeCall('closeWardrobe')) forceScreen('screen-map'); refreshAll(); }
  function continueSafe(){ if(!safeCall('continueFromComplete')) goMap(); refreshAll(); }
  function startAdventureSafe(ev){
    if(ev){ ev.preventDefault(); ev.stopPropagation(); }
    A.sound('start');
    forceScreen('screen-map');
    try{ if(fn('renderMap')) window.renderMap(); }catch(e){}
    refreshAll();
    return false;
  }
  window.startAdventureSafe = startAdventureSafe;
  function getHintsValue(){
    try{ if(window.state && isFinite(Number(window.state.hints))) return Number(window.state.hints); }catch(e){}
    try{ if(typeof state !== 'undefined' && state && isFinite(Number(state.hints))) return Number(state.hints); }catch(e){}
    var n = parseInt(((byId('topbar-hints-count')||byId('hints-count')||{}).textContent || '0'),10);
    return isFinite(n) ? n : 0;
  }
  window.aFixIdeasCounter = function(){
    var wallets = [];
    document.querySelectorAll('.xp-wallet-map,.xp-wallet,.topbar').forEach(function(w){ wallets.push(w); });
    wallets.forEach(function(w){
      var old = w.querySelector && w.querySelector('.topbar-hints');
      if(!old && w.classList && w.classList.contains('topbar')){
        old = document.createElement('div'); old.className='topbar-hints'; w.appendChild(old);
      }
      if(old){
        old.innerHTML = '<span class="idea-bulb" aria-hidden="true">💡</span><span id="topbar-hints-count" class="topbar-hints-count">'+getHintsValue()+'</span>';
        old.setAttribute('title','Ideas disponibles');
      }
    });
  };
  function fixIdeasCounter(){ window.aFixIdeasCounter(); }
  function bindAll(){
    document.querySelectorAll('.btn-start').forEach(function(b){ b.onclick=startAdventureSafe; });
    document.querySelectorAll('.back-soft').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); A.sound('back'); goWelcome(); return false; }; });
    document.querySelectorAll('.quiz-exit').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); A.sound('back'); if(!safeCall('exitQuiz')) goMap(); return false; }; });
    document.querySelectorAll('.lesson-back').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); A.sound('back'); goMap(); return false; }; });
    document.querySelectorAll('.wardrobe-back').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); A.sound('back'); closeWardrobeSafe(); return false; }; });
    document.querySelectorAll('.btn-save').forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); A.sound('success'); try{ if(fn('saveState')) window.saveState(); }catch(e){} goMap(); return false; }; });
    var c = byId('btn-continue'); if(c) c.onclick=function(ev){ ev.preventDefault(); A.sound('success'); continueSafe(); return false; };
    var nq = byId('btn-next'); if(nq) nq.onclick=function(ev){ ev.preventDefault(); A.sound('click'); safeCall('nextQ'); refreshAll(); return false; };
    var h = byId('btn-hint'); if(h) h.onclick=function(ev){ ev.preventDefault(); if(h.disabled){ A.sound('error'); return false; } A.sound('hint'); safeCall('useHint'); refreshAll(); return false; };
    var sq = byId('btn-start-quiz'); if(sq) sq.onclick=function(ev){ ev.preventDefault(); A.sound('start'); safeCall('beginQuiz'); refreshAll(); return false; };
    document.querySelectorAll('.btn-quiz-customize,.mascot-wrap,.map-title-mascot,.complete-hero-mascot,[onclick="openWardrobe()"]')
      .forEach(function(b){ b.onclick=function(ev){ ev.preventDefault(); ev.stopPropagation(); A.sound('click'); openWardrobeSafe(); return false; }; });
    document.querySelectorAll('.modal-btn').forEach(function(b){
      var txt=(b.textContent||'').toLowerCase();
      if(txt.indexOf('cancel')>-1) b.onclick=function(ev){ ev.preventDefault(); A.sound('back'); safeCall('closeResetModal'); return false; };
      if(txt.indexOf('borrar')>-1) b.onclick=function(ev){ ev.preventDefault(); A.sound('error'); safeCall('confirmResetProgress'); refreshAll(); return false; };
    });
    bindMapRows();
  }
  function bindMapRows(){
    var worlds = window.WORLDS || (typeof WORLDS !== 'undefined' ? WORLDS : null);
    document.querySelectorAll('#screen-map .world-block').forEach(function(block, wi){
      var header = block.querySelector('.world-header');
      if(header && !block.classList.contains('locked-world')){
        header.onclick=function(ev){ ev.preventDefault(); ev.stopPropagation(); A.sound('click'); block.classList.toggle('open'); return false; };
      }
      var world = worlds && worlds[wi];
      block.querySelectorAll('.world-levels .level-row').forEach(function(row, li){
        if(row.classList.contains('locked')) return;
        row.onclick=function(ev){
          ev.preventDefault(); ev.stopPropagation(); A.sound('start');
          var level = world && world.levels && world.levels[li];
          if(level && fn('startLevel')) window.startLevel(level, world);
          else if(fn('showLesson')) window.showLesson(li, wi);
          refreshAll(); return false;
        };
      });
    });
  }
  document.addEventListener('click', function(ev){
    var el = ev.target && ev.target.closest ? ev.target.closest('button,a,.world-header,.level-row,.witem,.skin-card,.skin-action,.opt') : null;
    if(!el) return;
    if(el.disabled) { A.sound('error'); return; }
    if(el.classList.contains('opt')) return; // options already have feedback sounds in the game logic
    if(el.classList.contains('btn-start')) return;
    if(el.classList.contains('btn-hint')) return;
    if(el.classList.contains('quiz-exit') || el.classList.contains('lesson-back') || el.classList.contains('wardrobe-back') || el.classList.contains('back-soft')) return;
    A.sound('click');
  }, true);
  ['renderMap','renderQ','renderWardrobe','refreshHintsUI'].forEach(function(name){
    var original = window[name];
    if(typeof original === 'function' && !original.__aGlobalButtonsWrapped){
      window[name] = function(){
        var out = original.apply(this, arguments);
        setTimeout(function(){ fixIdeasCounter(); bindAll(); }, 0);
        return out;
      };
      window[name].__aGlobalButtonsWrapped = true;
    }
  });
  function boot(){ bindAll(); fixIdeasCounter(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.addEventListener('load', boot);
  setTimeout(boot, 250); setTimeout(boot, 900); setTimeout(boot, 1800);
})();

;

/* === a-three-brains-gold-activator-js === */

;

(function(){
  'use strict';
  function clamp3(n){ n=Number(n); return Number.isFinite(n)?Math.max(0,Math.min(3,Math.round(n))):0; }
  function worlds(){ try{ return window.WORLDS || (typeof WORLDS !== 'undefined' ? WORLDS : []); }catch(e){ return []; } }
  function keyOf(level){
    try{ if(typeof window.levelKey === 'function') return window.levelKey(level); }catch(e){}
    try{ if(typeof levelKey === 'function') return levelKey(level); }catch(e){}
    return level && level.id != null ? String(level.id) : '';
  }
  function storedBrains(level){
    var k = keyOf(level);
    try{ if(window.state && window.state.medals && k) return clamp3(window.state.medals[k] || 0); }catch(e){}
    try{ if(typeof state !== 'undefined' && state && state.medals && k) return clamp3(state.medals[k] || 0); }catch(e){}
    try{ if(typeof window.getMedal === 'function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal === 'function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function visibleBrains(row){
    try{
      var n = row.querySelectorAll('.a-level-mind').length;
      if(n) return clamp3(n);
      var label = row.querySelector('.a-level-minds');
      if(label){ var m=(label.getAttribute('aria-label')||'').match(/(\d+)\s*de\s*3/); if(m) return clamp3(m[1]); }
    }catch(e){}
    return 0;
  }
  function applyRow(row, level){
    var got = Math.max(storedBrains(level), visibleBrains(row));
    var gold = got >= 3;
    row.classList.toggle('gold-mastered', gold);
    row.classList.toggle('a-three-brains-gold', gold);
    if(gold){
      var num=row.querySelector('.lv-num');
      if(num){ num.style.setProperty('background','rgba(255,224,64,.20)','important'); num.style.setProperty('color','#ffe040','important'); }
      var name=row.querySelector('.lv-name');
      if(name){ name.style.setProperty('color','#ffe040','important'); }
    }
  }
  function applyWorld(block, world){
    if(!block || !world || !Array.isArray(world.levels)) return;
    var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
    var shownLevels = block.classList.contains('locked-world') ? world.levels.filter(function(l){ return l && l.boss; }) : world.levels;
    shownLevels.forEach(function(level, i){ if(rows[i]) applyRow(rows[i], level); });
    var allGold = !block.classList.contains('locked-world') && world.levels.length && world.levels.every(function(level){ return storedBrains(level) >= 3; });
    block.classList.toggle('all-gold', !!allGold);
    if(allGold){
      var wn=block.querySelector('.world-name');
      if(wn) wn.style.setProperty('color','#ffe040','important');
    }
  }
  function activateGoldRows(){
    var map=document.getElementById('screen-map'); if(!map) return;
    var ws=worlds(); if(!Array.isArray(ws) || !ws.length) return;
    var blocks=Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    ws.forEach(function(world, i){ applyWorld(blocks[i], world); });
  }
  var timer=null;
  function schedule(){ clearTimeout(timer); timer=setTimeout(activateGoldRows, 70); }
  ['renderMap','goToMap','finishLevel','continueFromComplete','saveState','saveProgress','loadProgress','aRefreshTopbarAndLevelMinds'].forEach(function(name){
    try{
      if(typeof window[name] !== 'function' || window[name].__aThreeBrainsGoldHook) return;
      var original=window[name];
      var wrapped=function(){ var r=original.apply(this, arguments); schedule(); return r; };
      wrapped.__aThreeBrainsGoldHook=true;
      window[name]=wrapped;
    }catch(e){}
  });
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('focus', schedule);
  document.addEventListener('click', function(){ setTimeout(schedule, 0); }, true);
  setInterval(schedule, 1000);
  window.aActivateThreeBrainsGold = activateGoldRows;
  schedule();
})();

;

/* === a-unlocked-world-levels-fix === */

;

(function(){
  'use strict';
  if (window.__aUnlockedWorldLevelsFix) return;
  window.__aUnlockedWorldLevelsFix = true;
  function worlds(){
    try { return window.WORLDS || (typeof WORLDS !== 'undefined' ? WORLDS : []); } catch(e){ return []; }
  }
  function fn(name){ return typeof window[name] === 'function'; }
  function worldIsUnlocked(wi){
    try {
      if (fn('isUnlocked')) return !!window.isUnlocked(wi, 0);
      return wi === 0;
    } catch(e){ return wi === 0; }
  }

  function patchUnlockRule(){
    try{
      if (!fn('isUnlocked') || window.isUnlocked.__aWorldWideUnlock) return;
      var original = window.isUnlocked;
      var patched = function(worldIdx, levelIdx){
        try{
          if (Number(levelIdx) > 0 && original.call(this, worldIdx, 0)) return true;
        }catch(e){}
        return original.apply(this, arguments);
      };
      patched.__aWorldWideUnlock = true;
      patched.__aOriginal = original;
      window.isUnlocked = patched;
    }catch(e){}
  }
  function bindAllLevelsInUnlockedWorlds(){
    var ws = worlds();
    var blocks = Array.prototype.slice.call(document.querySelectorAll('#screen-map .world-block'));
    blocks.forEach(function(block, wi){
      if (!block || block.classList.contains('locked-world') || !worldIsUnlocked(wi)) return;
      var world = ws && ws[wi];
      if (!world || !Array.isArray(world.levels)) return;
      block.querySelectorAll('.world-levels .level-row').forEach(function(row, li){
        var level = world.levels[li];
        if (!level) return;
        row.classList.remove('locked');
        row.removeAttribute('aria-disabled');
        row.style.setProperty('opacity', '1', 'important');
        row.style.setProperty('cursor', 'pointer', 'important');
        row.style.setProperty('pointer-events', 'auto', 'important');
        var badge = row.querySelector('.lv-badge.locked');
        if (badge) {
          badge.classList.remove('locked');
          badge.classList.add('ready');
          badge.textContent = '▶';
        }
        row.onclick = function(ev){
          ev.preventDefault();
          ev.stopPropagation();
          try { if (window.A && typeof window.A.sound === 'function') window.A.sound('start'); } catch(e){}
          if (fn('startLevel')) window.startLevel(level, world);
          else if (fn('showLesson')) window.showLesson(level, world);
          return false;
        };
      });
    });
  }
  function refresh(){
    patchUnlockRule();
    setTimeout(bindAllLevelsInUnlockedWorlds, 0);
    setTimeout(bindAllLevelsInUnlockedWorlds, 80);
  }
  patchUnlockRule();
  ['renderMap','goToMap','finishLevel','continueFromComplete','loadProgress','loadState','saveProgress','saveState'].forEach(function(name){
    try{
      if (!fn(name) || window[name].__aUnlockedWorldLevelsWrapped) return;
      var original = window[name];
      var wrapped = function(){
        patchUnlockRule();
        var result = original.apply(this, arguments);
        refresh();
        return result;
      };
      wrapped.__aUnlockedWorldLevelsWrapped = true;
      window[name] = wrapped;
    }catch(e){}
  });
  document.addEventListener('DOMContentLoaded', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('click', function(){ setTimeout(refresh, 0); }, true);
  setInterval(refresh, 900);
  refresh();
})();

;

/* === a-final-boss-chain-unlock-js === */

;

(function(){
  'use strict';
  if (window.__aFinalBossChainUnlock) return;
  window.__aFinalBossChainUnlock = true;
  function ws(){
    try { return WORLDS; } catch(e) {}
    try { return window.WORLDS || []; } catch(e) { return []; }
  }
  function medal(level){
    try { return Number(getMedal(level) || 0); } catch(e) {}
    try {
      var key = typeof levelKey === 'function' ? levelKey(level) : ('l_' + level.id);
      return Number(state && state.medals && state.medals[key] || 0);
    } catch(e) {}
    return 0;
  }
  function worldUnlocked(worldIdx){
    worldIdx = Number(worldIdx) || 0;
    if (worldIdx === 0) return true;
    var worlds = ws();
    var prevWorld = worlds[worldIdx - 1];
    if (!prevWorld || !Array.isArray(prevWorld.levels)) return false;
    var prevBoss = prevWorld.levels.find(function(l){ return l && l.boss; });
    return !!prevBoss && medal(prevBoss) >= 3;
  }
  window.aWorldUnlockedByBoss = worldUnlocked;
  window.isUnlocked = function(worldIdx, levelIdx){
    return worldUnlocked(worldIdx);
  };
  try { isUnlocked = window.isUnlocked; } catch(e) {}
  function cleanMap(){
    var worlds = ws();
    var blocks = Array.prototype.slice.call(document.querySelectorAll('#screen-map .world-block'));
    blocks.forEach(function(block, wi){
      var unlocked = worldUnlocked(wi);
      block.classList.toggle('locked-world', !unlocked);
      var header = block.querySelector('.world-header');
      var levels = block.querySelector('.world-levels');
      var sub = block.querySelector('.world-sub');
      var chev = block.querySelector('.world-chevron');
      if (!unlocked) {
        block.classList.remove('open');
        if (levels) levels.innerHTML = '';
        if (sub) sub.textContent = '🔒 Bloqueado';
        if (chev) chev.style.display = 'none';
        if (header) {
          header.onclick = null;
          header.style.cursor = 'default';
        }
        return;
      }
      if (chev) chev.style.display = '';
      if (header && typeof toggleWorld === 'function') {
        header.onclick = function(){ toggleWorld(header); };
        header.style.cursor = 'pointer';
      }
      var world = worlds[wi];
      if (!world || !Array.isArray(world.levels)) return;
      block.querySelectorAll('.world-levels .level-row').forEach(function(row, li){
        var level = world.levels[li];
        if (!level) return;
        row.classList.remove('locked');
        row.style.setProperty('opacity','1','important');
        row.style.setProperty('cursor','pointer','important');
        row.style.setProperty('pointer-events','auto','important');
        var badge = row.querySelector('.lv-badge.locked');
        if (badge) {
          badge.classList.remove('locked');
          badge.classList.add('ready');
          badge.textContent = '▶ Jugar';
        }
        row.onclick = function(ev){
          if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
          }
          if (typeof startLevel === 'function') startLevel(level, world);
          return false;
        };
      });
    });
  }
  function refresh(){
    try { window.isUnlocked = function(worldIdx, levelIdx){ return worldUnlocked(worldIdx); }; isUnlocked = window.isUnlocked; } catch(e) {}
    setTimeout(cleanMap, 0);
    setTimeout(cleanMap, 80);
    setTimeout(cleanMap, 220);
  }
  ['renderMap','goToMap','finishLevel','continueFromComplete','saveState','loadState'].forEach(function(name){
    try{
      var original = window[name] || (typeof eval(name) === 'function' ? eval(name) : null);
      if (!original || original.__aFinalBossChainWrapped) return;
      var wrapped = function(){
        var result = original.apply(this, arguments);
        refresh();
        return result;
      };
      wrapped.__aFinalBossChainWrapped = true;
      window[name] = wrapped;
      try { eval(name + ' = window["' + name + '"]'); } catch(e) {}
    }catch(e){}
  });
  document.addEventListener('DOMContentLoaded', refresh);
  window.addEventListener('focus', refresh);
  document.addEventListener('click', function(){ setTimeout(refresh, 0); }, true);
  setInterval(refresh, 700);
  refresh();
})();

;

/* === xp-recovery-minimal-script === */

;

document.addEventListener('DOMContentLoaded', () => {
  const fixBrand = () => {
    document.title = 'XP';
    document.querySelectorAll('#screen-map .brand').forEach(el => el.textContent = 'XP');
  };
  fixBrand();
  const originalRenderMap = window.renderMap;
  if(typeof originalRenderMap === 'function' && !window.__xpRecoveryRenderWrapped){
    window.renderMap = function(...args){
      const result = originalRenderMap.apply(this, args);
      fixBrand();
      return result;
    };
    window.__xpRecoveryRenderWrapped = true;
  }
  // If the previous broken version left the worlds container empty, render it again.
  setTimeout(() => {
    fixBrand();
    const container = document.getElementById('worlds-container');
    if(container && container.children.length === 0 && typeof window.renderMap === 'function'){
      try { window.renderMap(); } catch(e) {}
    }
  }, 80);
});

;

/* === xp-compact-popups-polish-script === */

;

document.addEventListener('DOMContentLoaded', () => {
  const cleanPopupLayers = () => {
    document.querySelectorAll('.emotion-layer').forEach(layer => {
      layer.style.background = 'transparent';
      layer.style.backdropFilter = 'none';
      layer.style.webkitBackdropFilter = 'none';
    });
  };
  cleanPopupLayers();
  const obs = new MutationObserver(cleanPopupLayers);
  obs.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['class','style']});
});

;

(function(){
  function compactEmotionLayer(){
    document.querySelectorAll('.emotion-layer,#emotion-layer').forEach(function(layer){
      layer.style.background='transparent';
      layer.style.backdropFilter='none';
      layer.style.webkitBackdropFilter='none';
      layer.style.pointerEvents='none';
      layer.querySelectorAll('.emotion-card').forEach(function(card){
        if(!card.classList.contains('hide')) card.style.transform='';
      });
    });
  }
  document.addEventListener('DOMContentLoaded', compactEmotionLayer);
  new MutationObserver(compactEmotionLayer).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
})();

;

/* === a-emotion-top-compact-v3-js === */

;

(function(){
  function forceCompactEmotion(){
    document.querySelectorAll('.emotion-layer,#emotion-layer').forEach(function(layer){
      layer.style.background='transparent';
      layer.style.backdropFilter='none';
      layer.style.webkitBackdropFilter='none';
      if(layer.classList.contains('active')){
        layer.style.top='10px';
        layer.style.bottom='auto';
      }
    });
  }
  document.addEventListener('DOMContentLoaded', forceCompactEmotion);
  new MutationObserver(forceCompactEmotion).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
})();

;

/* === a-hint-bottom-compact-js === */

;

(function(){
  'use strict';
  function normalizeHintToast(){
    var toast=document.getElementById('hint-toast');
    if(!toast) return;
    toast.classList.add('hint-toast');
    var icon=toast.querySelector('.hint-toast-icon');
    var text=document.getElementById('hint-toast-text');
    if(icon && text && icon.nextElementSibling!==text){ toast.insertBefore(icon,text); }
    if(icon) icon.textContent='💡';
  }
  document.addEventListener('DOMContentLoaded', normalizeHintToast);
  var oldShow = window.showHintToast;
  window.showHintToast = function(msg){
    normalizeHintToast();
    var toast=document.getElementById('hint-toast');
    var text=document.getElementById('hint-toast-text');
    if(!toast || !text) return oldShow ? oldShow.apply(this,arguments) : undefined;
    text.textContent = String(msg||'').replace(/^\s*💡\s*/,'').trim();
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t=setTimeout(function(){ toast.classList.remove('show'); }, 4400);
  };
})();

;

/* === a-final-level-row-compact-return-fix-js === */

;

(function(){
  'use strict';
  function compactLevelRows(){
    var rows = document.querySelectorAll('#screen-map .world-levels .level-row');
    rows.forEach(function(row){
      row.style.height = '62px';
      row.style.minHeight = '62px';
      row.style.maxHeight = '62px';
      row.style.padding = '12px 16px';
      row.style.transform = 'none';
      row.style.scale = '1';
      row.style.overflow = 'hidden';
      row.style.alignItems = 'center';
      row.style.flexWrap = 'nowrap';
      row.querySelectorAll('.ripple,[class*="ripple"]').forEach(function(r){ r.remove(); });
    });
  }
  window.aCompactLevelRows = compactLevelRows;
  ['renderMap','goToMap','continueFromComplete'].forEach(function(name){
    var original = window[name];
    if(typeof original !== 'function' || original.__aCompactWrapped) return;
    var wrapped = function(){
      var result = original.apply(this, arguments);
      compactLevelRows();
      setTimeout(compactLevelRows, 40);
      setTimeout(compactLevelRows, 180);
      return result;
    };
    wrapped.__aCompactWrapped = true;
    window[name] = wrapped;
  });
  document.addEventListener('visibilitychange', compactLevelRows, true);
  document.addEventListener('touchend', function(){ setTimeout(compactLevelRows, 80); }, true);
  document.addEventListener('click', function(){ setTimeout(compactLevelRows, 80); }, true);
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', compactLevelRows);
  else compactLevelRows();
})();

;

/* === a-fixed-brains-position-no-jump-js === */

;

(function(){
  'use strict';
  function clamp3(n){ n=Number(n); return Number.isFinite(n)?Math.max(0,Math.min(3,Math.round(n))):0; }
  function worlds(){ try{ return window.WORLDS || (typeof WORLDS !== 'undefined' ? WORLDS : []); }catch(e){ return []; } }
  function keyOf(level){
    try{ if(typeof window.levelKey === 'function') return window.levelKey(level); }catch(e){}
    try{ if(typeof levelKey === 'function') return levelKey(level); }catch(e){}
    return level && level.id != null ? String(level.id) : '';
  }
  function brainsOf(level){
    var k=keyOf(level);
    try{ if(window.state && window.state.medals && k) return clamp3(window.state.medals[k] || 0); }catch(e){}
    try{ if(typeof state !== 'undefined' && state && state.medals && k) return clamp3(state.medals[k] || 0); }catch(e){}
    try{ if(typeof window.getMedal === 'function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal === 'function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function buildBar(n){
    var bar=document.createElement('div');
    bar.className='a-level-minds a-fixed-brains-ready';
    bar.setAttribute('aria-label', n+' de 3 cerebros ganados');
    for(var i=0;i<n;i++){
      var s=document.createElement('span');
      s.className='a-level-mind';
      s.textContent='🧠';
      bar.appendChild(s);
    }
    return bar;
  }
  function applyFixedBrains(){
    var map=document.getElementById('screen-map');
    if(!map) return;
    var ws=worlds();
    if(!ws || !ws.length) return;
    var blocks=Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    ws.forEach(function(world, wi){
      var block=blocks[wi];
      if(!block) return;
      var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels || []).forEach(function(level, li){
        var row=rows[li];
        if(!row) return;
        row.querySelectorAll('.lv-badge.done,.brain-row-level,.level-brains,.level-stars,.brains-earned,.a-clean-brains-bar,.level-brains-earned').forEach(function(el){ el.remove(); });
        row.querySelectorAll('.a-level-minds').forEach(function(el){ el.remove(); });
        var n=brainsOf(level);
        if(n>0) row.appendChild(buildBar(n));
      });
    });
  }
  function nowAndNext(){
    applyFixedBrains();
    requestAnimationFrame(applyFixedBrains);
    setTimeout(applyFixedBrains, 30);
  }
  ['renderMap','goToMap','continueFromComplete','show','finishLevel','saveState','loadProgress'].forEach(function(name){
    try{
      var original=window[name];
      if(typeof original !== 'function' || original.__aFixedBrainsNoJump) return;
      var wrapped=function(){
        var result=original.apply(this, arguments);
        nowAndNext();
        return result;
      };
      wrapped.__aFixedBrainsNoJump=true;
      window[name]=wrapped;
    }catch(e){}
  });
  var scheduled=false;
  function schedule(){ if(scheduled) return; scheduled=true; requestAnimationFrame(function(){ scheduled=false; applyFixedBrains(); }); }
  try{
    var map=document.getElementById('screen-map');
    if(map){ new MutationObserver(schedule).observe(map,{childList:true,subtree:true}); }
  }catch(e){}
  document.addEventListener('DOMContentLoaded', nowAndNext);
  window.addEventListener('pageshow', nowAndNext);
  window.addEventListener('focus', nowAndNext);
  nowAndNext();
  window.aApplyFixedBrainsNoJump=nowAndNext;
})();

;

/* === a-exact-level-brain-count-final-js === */

;

(function(){
  'use strict';
  function clamp3(n){ n=Number(n); return Number.isFinite(n) ? Math.max(0, Math.min(3, Math.round(n))) : 0; }
  function worlds(){ try{ return window.WORLDS || (typeof WORLDS!=='undefined' ? WORLDS : []); }catch(e){ return []; } }
  function keyOf(level){
    try{ if(typeof window.levelKey==='function') return String(window.levelKey(level)); }catch(e){}
    try{ if(typeof levelKey==='function') return String(levelKey(level)); }catch(e){}
    return level && level.id != null ? String(level.id) : '';
  }
  function exactBrains(level){
    var k=keyOf(level);
    try{ if(window.state && window.state.medals && k in window.state.medals) return clamp3(window.state.medals[k]); }catch(e){}
    try{ if(typeof state!=='undefined' && state && state.medals && k in state.medals) return clamp3(state.medals[k]); }catch(e){}
    try{ if(typeof window.getMedal==='function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal==='function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function makeBar(n){
    var bar=document.createElement('div');
    bar.className='a-level-minds brains-'+n;
    bar.setAttribute('aria-label', n + ' de 3 cerebros ganados');
    bar.dataset.brains=String(n);
    for(var i=0;i<n;i++){
      var s=document.createElement('span');
      s.className='a-level-mind';
      s.textContent='🧠';
      bar.appendChild(s);
    }
    return bar;
  }
  function cleanRow(row){
    row.querySelectorAll('.lv-badge.done,.brain-row-level,.level-brains,.level-stars,.brains-earned,.a-clean-brains-bar,.level-brains-earned,.a-level-minds').forEach(function(el){ el.remove(); });
  }
  function apply(){
    var map=document.getElementById('screen-map');
    var ws=worlds();
    if(!map || !ws || !ws.length) return;
    var blocks=Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    ws.forEach(function(world, wi){
      var block=blocks[wi]; if(!block) return;
      var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels || []).forEach(function(level, li){
        var row=rows[li]; if(!row) return;
        var n=exactBrains(level);
        cleanRow(row);
        row.classList.toggle('a-three-brains', n===3);
        row.classList.toggle('gold-mastered', n===3);
        row.classList.toggle('a-partial-brains', n>0 && n<3);
        if(n>0) row.appendChild(makeBar(n));
      });
    });
  }
  var raf=0;
  function schedule(){
    if(raf) cancelAnimationFrame(raf);
    raf=requestAnimationFrame(function(){ raf=0; apply(); setTimeout(apply,40); });
  }
  ['renderMap','goToMap','continueFromComplete','finishLevel','saveState','loadProgress','show'].forEach(function(name){
    try{
      var original=window[name];
      if(typeof original!=='function' || original.__aExactBrainCountFinal) return;
      var wrapped=function(){ var result=original.apply(this, arguments); schedule(); return result; };
      wrapped.__aExactBrainCountFinal=true;
      window[name]=wrapped;
    }catch(e){}
  });
  try{
    var map=document.getElementById('screen-map');
    if(map){ new MutationObserver(schedule).observe(map,{childList:true,subtree:true}); }
  }catch(e){}
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('focus', schedule);
  setTimeout(schedule,0);
  setTimeout(schedule,250);
  window.aApplyExactLevelBrainCount=schedule;
})();

;

/* === a-brains-over-every-level-final-js === */

;

(function(){
  'use strict';
  function clamp3(value){
    value = Number(value);
    return Number.isFinite(value) ? Math.max(0, Math.min(3, Math.round(value))) : 0;
  }
  function getWorlds(){
    try{ return window.WORLDS || (typeof WORLDS !== 'undefined' ? WORLDS : []); }
    catch(e){ return []; }
  }
  function getKey(level){
    try{ if(typeof window.levelKey === 'function') return String(window.levelKey(level)); }catch(e){}
    try{ if(typeof levelKey === 'function') return String(levelKey(level)); }catch(e){}
    return level && level.id != null ? String(level.id) : '';
  }
  function brainsFor(level){
    var key = getKey(level);
    try{ if(window.state && window.state.medals && Object.prototype.hasOwnProperty.call(window.state.medals, key)) return clamp3(window.state.medals[key]); }catch(e){}
    try{ if(typeof state !== 'undefined' && state && state.medals && Object.prototype.hasOwnProperty.call(state.medals, key)) return clamp3(state.medals[key]); }catch(e){}
    try{ if(typeof window.getMedal === 'function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal === 'function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function makeBrains(n){
    var bar = document.createElement('div');
    bar.className = 'a-level-minds brains-' + n;
    bar.dataset.brains = String(n);
    bar.setAttribute('aria-label', n + ' de 3 cerebros ganados');
    for(var i = 0; i < n; i++){
      var brain = document.createElement('span');
      brain.className = 'a-level-mind';
      brain.textContent = '🧠';
      bar.appendChild(brain);
    }
    return bar;
  }
  function clean(row){
    if(!row) return;
    row.querySelectorAll('.lv-badge.done,.brain-row-level,.level-brains,.level-stars,.brains-earned,.a-clean-brains-bar,.level-brains-earned,.a-exact-brain-bar,.a-level-brains-bar,.a-level-minds').forEach(function(el){ el.remove(); });
  }
  function applyBrainsOverLevels(){
    var map = document.getElementById('screen-map');
    var worldList = getWorlds();
    if(!map || !worldList || !worldList.length) return;
    var blocks = Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    worldList.forEach(function(world, worldIndex){
      var block = blocks[worldIndex];
      if(!block || block.classList.contains('locked-world')) return;
      var rows = Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels || []).forEach(function(level, levelIndex){
        var row = rows[levelIndex];
        if(!row) return;
        var n = brainsFor(level);
        clean(row);
        row.classList.toggle('a-three-brains', n === 3);
        row.classList.toggle('gold-mastered', n === 3);
        row.classList.toggle('a-partial-brains', n > 0 && n < 3);
        row.appendChild(makeBrains(n));
      });
    });
  }
  var raf = 0;
  function schedule(){
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function(){
      raf = 0;
      applyBrainsOverLevels();
      setTimeout(applyBrainsOverLevels, 35);
      setTimeout(applyBrainsOverLevels, 150);
    });
  }
  ['renderMap','goToMap','finishLevel','continueFromComplete','saveState','loadProgress','show'].forEach(function(name){
    try{
      var original = window[name];
      if(typeof original !== 'function' || original.__aBrainsOverEveryLevelFinal) return;
      var wrapped = function(){
        var result = original.apply(this, arguments);
        schedule();
        return result;
      };
      wrapped.__aBrainsOverEveryLevelFinal = true;
      window[name] = wrapped;
    }catch(e){}
  });
  try{
    var map = document.getElementById('screen-map');
    if(map){ new MutationObserver(schedule).observe(map,{childList:true,subtree:true}); }
  }catch(e){}
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('focus', schedule);
  setTimeout(schedule, 0);
  setTimeout(schedule, 300);
  window.aApplyBrainsOverEveryLevelFinal = schedule;
})();

;

/* === a-soft-hints-start-five-final === */

;

(function(){
  'use strict';
  var MAX_HINTS = 5;
  function safeState(){
    try{ return (typeof window.state !== 'undefined' && window.state) ? window.state : (typeof state !== 'undefined' ? state : null); }
    catch(e){ return null; }
  }
  function persist(){
    try{ if(typeof window.saveState === 'function') window.saveState(); }
    catch(e){}
  }
  function getHintsSafe(){
    var s = safeState();
    if(!s) return MAX_HINTS;
    if(typeof s.hints !== 'number' || isNaN(s.hints)) s.hints = MAX_HINTS;
    s.hints = Math.max(0, Math.min(MAX_HINTS, s.hints));
    return s.hints;
  }
  function setHintsSafe(n){
    var s = safeState();
    if(!s) return;
    s.hints = Math.max(0, Math.min(MAX_HINTS, Number(n)||0));
    persist();
  }
  function refreshHintsSoftUI(){
    var n = getHintsSafe();
    var places = [
      document.getElementById('hints-available'),
      document.getElementById('topbar-hints-count'),
      document.getElementById('topbar-hints-map-count'),
      document.getElementById('hints-count-display')
    ];
    places.forEach(function(el){ if(el) el.textContent = n; });
    var btn = document.getElementById('btn-hint');
    if(btn){
      var answeredNow = false;
      try{ answeredNow = (typeof answered !== 'undefined' && answered === true); }catch(e){}
      btn.disabled = n <= 0 || answeredNow;
    }
  }
  function normalize(txt){
    return String(txt || '')
      .replace(/<[^>]*>/g,' ')
      .replace(/[_]+/g,' ')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }
  function currentQuestion(){
    try{
      if(typeof currentLevel !== 'undefined' && currentLevel && currentLevel.qs && typeof currentQIndex !== 'undefined'){
        return currentLevel.qs[currentQIndex];
      }
    }catch(e){}
    return null;
  }
  function makeSoftHint(q){
    // Always use the tip from the question first — it has the exact grammar rule
    if(q && q.tip){
      var clean = String(q.tip).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
      if(clean.length >= 8) return clean;
    }
    var bag = normalize([q && q.es, q && q.en, q && q.blank, q && q.opts && q.opts.join(' ')].join(' '));
    if(/\b(am|is|are|was|were)\b/.test(bag)){
      return 'To be cambia según el sujeto: I → am, He/She/It → is, You/We/They → are.';
    }
    if(/\b(a|an|the)\b/.test(bag)){
      return 'Usa "a" antes de sonido consonante y "an" antes de sonido vocal. "The" para cosas específicas o únicas.';
    }
    if(/\b(children|feet|mice|men|women|teeth|sheep|fish)\b/.test(bag)){
      return 'Plural irregular: esta palabra cambia completamente, no añade -s. Hay que memorizarla.';
    }
    if(/\b(buses|watches|churches|boxes|classes)\b/.test(bag)){
      return 'Palabras que terminan en -s, -sh, -ch, -x o -z forman el plural con -es.';
    }
    if(/\b(yesterday|ago|last night|last week|did)\b/.test(bag)){
      return 'Señal de pasado: usa el pasado simple. Verbos regulares añaden -ed; los irregulares cambian de forma (go→went, see→saw).';
    }
    if(/\b(will|going to|tomorrow|next week)\b/.test(bag)){
      return '"Will" para decisiones espontáneas o promesas. "Going to" para planes ya decididos. Ambos van seguidos del verbo en forma base.';
    }
    if(/\b(does|doesn't)\b/.test(bag)){
      return 'Con He/She/It en presente simple: "does" en preguntas, "doesn\'t" en negativo. Después el verbo va en forma base.';
    }
    if(/\b(he|she|it)\b/.test(bag)){
      return 'Con He/She/It en presente simple el verbo lleva -s o -es al final: works, plays, goes, has.';
    }
    if(/\b(never|always|usually|often|sometimes|rarely)\b/.test(bag)){
      return 'Adverbios de frecuencia van antes del verbo principal pero después del to be.';
    }
    if(/\b(can|could|should|must|may|might)\b/.test(bag)){
      return 'Después de un verbo modal el verbo siguiente siempre va en forma base, sin -s ni -ed.';
    }
    return 'Lee el sujeto de la oración para saber qué forma verbal corresponde.';
  }
  function showSoftHint(text){
    var toast = document.getElementById('hint-toast');
    var box = document.getElementById('hint-toast-text');
    if(!toast || !box) return;
    box.textContent = '💡 Pista: ' + text;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toast._aSoftHintTimer);
    toast._aSoftHintTimer = setTimeout(function(){ toast.classList.remove('show'); }, 5200);
  }
  function ensureStartingHints(){
    var s = safeState();
    if(!s) return;
    if(typeof s.hints !== 'number' || isNaN(s.hints)){
      s.hints = MAX_HINTS;
      persist();
    }
    s.hints = Math.max(0, Math.min(MAX_HINTS, s.hints));
    refreshHintsSoftUI();
  }
  window.getHints = function(){ return getHintsSafe(); };
  window.setHints = function(n){ setHintsSafe(n); refreshHintsSoftUI(); };
  window.refreshHintsUI = function(){ refreshHintsSoftUI(); };
  window.useHint = function(){ /* delegated */ if(window.__aHintUpgradeDone){} };
  function wrapSelectAns(){
    // Hint recovery on error is handled by earnHint() in the master patch.
    // This wrapper only refreshes the UI to keep counters in sync.
    try{
      if(typeof window.selectAns !== 'function' || window.selectAns.__aSoftHintsFinal) return;
      var original = window.selectAns;
      var wrapped = function(idx){
        var result = original.apply(this, arguments);
        refreshHintsSoftUI();
        return result;
      };
      wrapped.__aSoftHintsFinal = true;
      window.selectAns = wrapped;
    }catch(e){}
  }
  function wrapBeginQuiz(){
    try{
      if(typeof window.beginQuiz !== 'function' || window.beginQuiz.__aStartFiveHintsFinal) return;
      var original = window.beginQuiz;
      var wrapped = function(){
        ensureStartingHints();
        var result = original.apply(this, arguments);
        refreshHintsSoftUI();
        return result;
      };
      wrapped.__aStartFiveHintsFinal = true;
      window.beginQuiz = wrapped;
    }catch(e){}
  }
  function boot(){
    ensureStartingHints();
    wrapSelectAns();
    wrapBeginQuiz();
    refreshHintsSoftUI();
  }
  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('pageshow', boot);
  window.addEventListener('focus', boot);
  setTimeout(boot, 0);
  setTimeout(boot, 250);
  setTimeout(boot, 900);
})();

;

/* === final-brain-display-js === */

;

(function(){
  'use strict';
  function clamp3(v){ v=Number(v); return Number.isFinite(v)?Math.max(0,Math.min(3,Math.round(v))):0; }
  function worlds(){ try{ return window.WORLDS||(typeof WORLDS!=='undefined'?WORLDS:[]); }catch(e){ return []; } }
  function getKey(level){
    try{ if(typeof window.levelKey==='function') return String(window.levelKey(level)); }catch(e){}
    try{ if(typeof levelKey==='function') return String(levelKey(level)); }catch(e){}
    return level&&level.id!=null?String(level.id):'';
  }
  function brainsFor(level){
    var key=getKey(level);
    try{ if(window.state&&window.state.medals&&Object.prototype.hasOwnProperty.call(window.state.medals,key)) return clamp3(window.state.medals[key]); }catch(e){}
    try{ if(typeof state!=='undefined'&&state&&state.medals&&Object.prototype.hasOwnProperty.call(state.medals,key)) return clamp3(state.medals[key]); }catch(e){}
    try{ if(typeof window.getMedal==='function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal==='function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function makeBrains(n){
    var bar=document.createElement('div');
    bar.className='a-level-minds brains-'+n;
    bar.dataset.brains=String(n);
    bar.setAttribute('aria-label',n+' de 3 cerebros ganados');
    for(var i=0;i<n;i++){
      var s=document.createElement('span');
      s.className='a-level-mind';
      s.textContent='🧠';
      bar.appendChild(s);
    }
    return bar;
  }
  function cleanRow(row){
    row.querySelectorAll('.a-level-minds,.a-clean-brains-bar,.a-exact-brain-bar,.brain-row-level,.level-brains,.level-stars,.brains-earned,.level-brains-earned').forEach(function(el){ el.remove(); });
  }
  function apply(){
    var map=document.getElementById('screen-map');
    var ws=worlds();
    if(!map||!ws||!ws.length) return;
    var blocks=Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    ws.forEach(function(world,wi){
      var block=blocks[wi];
      if(!block||block.classList.contains('locked-world')) return;
      var rows=Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels||[]).forEach(function(level,li){
        var row=rows[li]; if(!row) return;
        var n=brainsFor(level);
        cleanRow(row);
        row.classList.toggle('a-three-brains',n===3);
        row.classList.toggle('gold-mastered',n===3);
        row.classList.toggle('a-partial-brains',n>0&&n<3);
        // Always append bar (brains-0 is hidden via CSS, 1-3 are visible)
        row.appendChild(makeBrains(n));
      });
    });
  }
  var raf=0;
  function schedule(){
    if(raf) cancelAnimationFrame(raf);
    raf=requestAnimationFrame(function(){
      raf=0;
      apply();
      setTimeout(apply,50);
      setTimeout(apply,200);
    });
  }
  // Hook into all relevant functions
  ['renderMap','goToMap','finishLevel','continueFromComplete','saveState','loadProgress','show'].forEach(function(name){
    try{
      var original=window[name];
      if(typeof original!=='function'||original.__finalBrainDisplayFixed) return;
      var wrapped=function(){ var r=original.apply(this,arguments); schedule(); return r; };
      wrapped.__finalBrainDisplayFixed=true;
      window[name]=wrapped;
    }catch(e){}
  });
  // MutationObserver on the map
  try{
    var map=document.getElementById('screen-map');
    if(map){ new MutationObserver(function(muts){ var hasRelevant=muts.some(function(m){ return m.addedNodes.length>0&&Array.prototype.some.call(m.addedNodes,function(n){ return n.nodeType===1&&(n.matches&&(n.matches('.level-row,.world-block,.world-levels')||n.querySelector&&n.querySelector('.level-row'))); }); }); if(hasRelevant) schedule(); }).observe(map,{childList:true,subtree:true}); }
  }catch(e){}
  document.addEventListener('DOMContentLoaded',schedule);
  window.addEventListener('pageshow',schedule);
  window.addEventListener('focus',schedule);
  setTimeout(schedule,0);
  setTimeout(schedule,300);
  setTimeout(schedule,800);
  window.finalBrainDisplayApply=schedule;
})();

;

/* === a-final-contextual-hints === */

;

(function(){
  'use strict';

  function safeText(v){
    return String(v == null ? '' : v).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  }
  function esc(s){
    return safeText(s).replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function currentQuestion(){
    try{
      if(typeof currentLevel !== 'undefined' && currentLevel && currentLevel.qs){
        return currentLevel.qs[typeof currentQIndex !== 'undefined' ? currentQIndex : 0];
      }
    }catch(e){}
    return null;
  }
  function currentLevelName(){
    try{
      return safeText((typeof currentLevel !== 'undefined' && currentLevel) ? (currentLevel.name + ' ' + currentLevel.sub) : '');
    }catch(e){ return ''; }
  }
  function wordAfterBlank(en){
    var m = safeText(en).match(/___\s+([A-Za-z'-]+)/);
    return m ? m[1] : '';
  }
  function subjectBeforeBlank(en){
    var left = safeText(en).split('___')[0].trim();
    var words = left.split(/\s+/).filter(Boolean);
    if(!words.length) return '';
    if(words.length >= 2 && /^(the|a|an|my|your|his|her|our|their)$/i.test(words[words.length-2])){
      return words.slice(-2).join(' ');
    }
    return words[words.length-1];
  }
  function category(q){
    var level = currentLevelName().toLowerCase();
    var bag = [level, q && q.es, q && q.en, q && q.opts && q.opts.join(' ')].join(' ').toLowerCase();
    if(/pronombre|pronoun/.test(bag)) return ['Pronombre correcto','👤'];
    if(/artículo|article|\ba\b|\ban\b|\bthe\b/.test(bag)) return ['Artículo correcto','🔤'];
    if(/plural|children|feet|mice|buses|watches/.test(bag)) return ['Plural','🧩'];
    if(/continuous|ing|está|estoy|estamos|están/.test(bag)) return ['Presente continuo','▶️'];
    if(/negative|negatives|isn.t|aren.t|not/.test(bag)) return ['Negativo','🚫'];
    if(/question|questions|\?/.test(bag)) return ['Pregunta','❓'];
    if(/to be|am|is|are/.test(bag)) return ['Verb To Be','🔵'];
    if(/past|was|were|did|went|yesterday|last/.test(bag)) return ['Pasado','⏪'];
    if(/future|will|going to/.test(bag)) return ['Futuro','🔮'];
    if(/perfect|have|has|already|yet|ever|since|for/.test(bag)) return ['Present perfect','🔗'];
    if(/modal|can|could|should|must|might|would/.test(bag)) return ['Modal verb','⚙️'];
    if(/conditional|if|unless/.test(bag)) return ['Condicional','🌀'];
    return ['Pista de la pregunta','💡'];
  }
  function pronounHint(q){
    var es = safeText(q.es).toLowerCase();
    if(/mamá|madre|hermana|mujer|niña|maría|ana|ella/.test(es)) return 'En esta oración, cambia la persona femenina mencionada por un pronombre sujeto. Es una sola persona y la acción la hace ella.';
    if(/padre|papá|juan|pedro|hombre|niño|hermano|él/.test(es) && !/ y yo| y tú/.test(es)) return 'Aquí se reemplaza una persona masculina singular por un pronombre sujeto. Mira quién hace la acción, no quién la recibe.';
    if(/ y yo|yo y /.test(es)) return 'Cuando tú estás incluido con otra persona, el pronombre debe representar “esa persona + yo”.';
    if(/tú|vos|usted|ustedes|ustedes/.test(es)) return 'La oración le habla directamente a la persona o grupo de personas. Busca el pronombre usado para dirigirte a alguien.';
    if(/gato|perro|animal|mesa|libro|cosa|ciudad|carro|carro/.test(es)) return 'Cuando no estás hablando de una persona, en inglés normalmente se usa el pronombre neutro como sujeto.';
    return 'Reemplaza el sujeto de la frase en español por un pronombre sujeto en inglés. Pregúntate: ¿quién hace la acción?';
  }
  function articleHint(q){
    var next = wordAfterBlank(q.en);
    if(/^the$/i.test(safeText(q.blank))) return 'Aquí no estás eligiendo por sonido; estás marcando algo específico, único o ya conocido en el contexto.';
    if(next){
      var startsVowel = /^[aeiou]/i.test(next);
      return 'Mira la palabra que viene después del espacio: “' + esc(next) + '”. El artículo depende del sonido inicial, no solo de la letra escrita.';
    }
    return 'Para elegir artículo, mira si hablas de algo general por primera vez o de algo específico/único.';
  }
  function toBeHint(q){
    var subj = subjectBeforeBlank(q.en);
    if(/^i$/i.test(subj)) return 'El sujeto antes del espacio es “I”. En To Be, “I” tiene una forma especial que no se comparte con he/she/it ni con they/we/you.';
    if(/^(he|she|it)$/i.test(subj) || /^(the|my|your|his|her|our|their)\s+\w+$/i.test(subj)) return 'El sujeto antes del espacio es singular. En To Be, los sujetos singulares de tercera persona van en el mismo grupo.';
    if(/^(you|we|they)$/i.test(subj)) return 'El sujeto antes del espacio pertenece al grupo plural/segunda persona. Ese grupo usa la forma amplia de To Be.';
    return 'Primero identifica el sujeto antes del espacio; luego decide si pertenece a I, he/she/it o you/we/they.';
  }
  function pluralHint(q){
    var en = safeText(q.en).toLowerCase();
    if(/two|three|many|several|mis|los|las|dos|tres/.test((q.es+' '+en).toLowerCase())){
      if(/child|foot|mouse|tooth|man|woman/.test((q.opts||[]).join(' ').toLowerCase())) return 'La cantidad indica plural, pero esta palabra es irregular: no basta con añadir -s.';
      if(/bus|watch|box|dish|church/.test((q.opts||[]).join(' ').toLowerCase())) return 'La cantidad indica plural. Si la palabra termina en sonido s/ch/sh/x/z, normalmente necesita -es.';
      return 'La cantidad te obliga a usar plural. Busca la opción que suene como sustantivo plural natural, no singular.';
    }
    return 'Mira si la oración habla de una sola cosa o de varias. El número manda la forma del sustantivo.';
  }
  function continuousHint(q){
    var aux = subjectBeforeBlank(q.en);
    return 'La oración ya trae una forma de “be” antes del espacio. Después de am/is/are, la acción debe ir como verbo en progreso: forma -ing.';
  }
  function negativeHint(q){
    return 'Para negar, busca dónde va “not” o su contracción. La forma negativa debe concordar con el sujeto y el auxiliar de la oración.';
  }
  function questionHint(q){
    return 'En preguntas en inglés, el auxiliar suele ir antes del sujeto. Mira qué palabra abre la pregunta y qué sujeto viene después.';
  }
  function fallbackHint(q){
    var en = safeText(q.en);
    var left = en.split('___')[0].trim();
    var right = en.split('___')[1] ? en.split('___')[1].trim() : '';
    if(left || right) return 'Lee los dos lados del espacio: “' + esc(left || '...') + ' ___ ' + esc(right || '...') + '”. La palabra correcta debe encajar con esa estructura, no solo con la traducción.';
    return 'Lee la oración completa y descarta primero las opciones que rompen la estructura gramatical.';
  }
  function makeHint(q){
    var cat = category(q);
    var level = cat[0];
    var main;
    if(level === 'Pronombre correcto') main = pronounHint(q);
    else if(level === 'Artículo correcto') main = articleHint(q);
    else if(level === 'Plural') main = pluralHint(q);
    else if(level === 'Presente continuo') main = continuousHint(q);
    else if(level === 'Negativo') main = negativeHint(q);
    else if(level === 'Pregunta') main = questionHint(q);
    else if(level === 'Verb To Be') main = toBeHint(q);
    else main = fallbackHint(q);

    var focus = q ? 'Pregunta actual: “' + esc(q.es) + '” → mira el espacio en “' + esc(q.en) + '”.' : 'Mira la pregunta actual antes de elegir.';
    return '<div class="hint-card-title"><span>'+cat[1]+'</span><span>'+esc(level)+'</span></div>'
      + '<div class="hint-card-main">'+main+'</div>'
      + '<div class="hint-card-focus">'+focus+'</div>';
  }

  function getHintsSafe(){
    try{ if(typeof getHints === 'function') return getHints(); }catch(e){}
    try{ return (typeof state !== 'undefined' && state && typeof state.hints === 'number') ? state.hints : 0; }catch(e){}
    return 0;
  }
  function setHintsSafe(n){
    try{ if(typeof setHints === 'function') return setHints(n); }catch(e){}
    try{ if(typeof state !== 'undefined' && state) state.hints = Math.max(0, Math.min(5, n)); }catch(e){}
  }

  window.useHint = function(){
    var n = getHintsSafe();
    var isAnswered = false;
    try{ isAnswered = (typeof answered !== 'undefined' && answered === true); }catch(e){}
    if(n <= 0 || isAnswered) return;

    setHintsSafe(n - 1);
    try{ if(typeof saveState === 'function') saveState(); }catch(e){}
    try{ if(typeof refreshHintsUI === 'function') refreshHintsUI(); }catch(e){}
    try{ if(typeof refreshHintsSoftUI === 'function') refreshHintsSoftUI(); }catch(e){}

    var q = currentQuestion();
    var toast = document.getElementById('hint-toast');
    var text = document.getElementById('hint-toast-text');
    if(toast && text){
      text.innerHTML = makeHint(q);
      toast.style.textAlign = 'left';
      toast.classList.remove('show');
      void toast.offsetWidth;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function(){ toast.classList.remove('show'); }, 8500);
    }

    try{
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(1047, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.22);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.4);
    }catch(e){}
  };

  // Reaplicar después de otros scripts tardíos.
  setTimeout(function(){ window.useHint = window.useHint; }, 0);
})();

;

/* === a-final-real-brains-count-js === */

;

(function(){
  'use strict';
  function clamp3(v){
    v = Number(v);
    return Number.isFinite(v) ? Math.max(0, Math.min(3, Math.round(v))) : 0;
  }
  function getWorlds(){
    try{ if(Array.isArray(window.WORLDS)) return window.WORLDS; }catch(e){}
    try{ if(typeof WORLDS !== 'undefined' && Array.isArray(WORLDS)) return WORLDS; }catch(e){}
    return [];
  }
  function keyOf(level){
    try{ if(typeof window.levelKey === 'function') return String(window.levelKey(level)); }catch(e){}
    try{ if(typeof levelKey === 'function') return String(levelKey(level)); }catch(e){}
    if(level && level.id != null) return String(level.id);
    if(level && level.name != null) return String(level.name);
    return '';
  }
  function getBrains(level){
    var key = keyOf(level);
    try{ if(key && window.state && window.state.medals && Object.prototype.hasOwnProperty.call(window.state.medals, key)) return clamp3(window.state.medals[key]); }catch(e){}
    try{ if(key && typeof state !== 'undefined' && state && state.medals && Object.prototype.hasOwnProperty.call(state.medals, key)) return clamp3(state.medals[key]); }catch(e){}
    try{ if(typeof window.getMedal === 'function') return clamp3(window.getMedal(level)); }catch(e){}
    try{ if(typeof getMedal === 'function') return clamp3(getMedal(level)); }catch(e){}
    return 0;
  }
  function makeBar(n){
    var bar = document.createElement('div');
    bar.className = 'a-level-minds brains-' + n;
    bar.dataset.brains = String(n);
    bar.setAttribute('aria-label', n + ' de 3 cerebros conseguidos');
    for(var i=0; i<n; i++){
      var b = document.createElement('span');
      b.className = 'a-level-mind';
      b.textContent = '🧠';
      bar.appendChild(b);
    }
    return bar;
  }
  function cleanOld(row){
    row.querySelectorAll('.a-level-minds,.a-clean-brains-bar,.a-exact-brain-bar,.a-level-brains-bar,.brain-row-level,.level-brains,.level-stars,.brains-earned,.level-brains-earned,.lv-badge.done').forEach(function(el){ el.remove(); });
  }
  function applyRealBrainCounts(){
    var map = document.getElementById('screen-map');
    var worlds = getWorlds();
    if(!map || !worlds.length) return;
    var blocks = Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    worlds.forEach(function(world, wi){
      var block = blocks[wi];
      if(!block || block.classList.contains('locked-world')) return;
      var rows = Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels || []).forEach(function(level, li){
        var row = rows[li];
        if(!row) return;
        var n = getBrains(level);
        cleanOld(row);
        row.classList.toggle('gold-mastered', n === 3);
        row.classList.toggle('a-three-brains-gold', n === 3);
        row.classList.toggle('a-partial-brains', n > 0 && n < 3);
        row.appendChild(makeBar(n));
      });
    });
  }
  var timer = 0;
  function schedule(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      applyRealBrainCounts();
      setTimeout(applyRealBrainCounts, 80);
      setTimeout(applyRealBrainCounts, 240);
    }, 20);
  }
  ['renderMap','goToMap','finishLevel','continueFromComplete','saveState','saveProgress','loadState','loadProgress','selectAns','nextQ','aRefreshTopbarAndLevelMinds'].forEach(function(name){
    try{
      if(typeof window[name] !== 'function' || window[name].__aFinalRealBrainsHook) return;
      var original = window[name];
      var wrapped = function(){ var r = original.apply(this, arguments); schedule(); return r; };
      wrapped.__aFinalRealBrainsHook = true;
      window[name] = wrapped;
    }catch(e){}
  });
  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('focus', schedule);
  document.addEventListener('click', function(){ setTimeout(schedule, 0); }, true);
  try{
    var target = document.getElementById('screen-map') || document.body;
    new MutationObserver(function(){ schedule(); }).observe(target, {childList:true, subtree:true});
  }catch(e){}
  setInterval(schedule, 900);
  schedule();
  window.aApplyRealBrainCounts = applyRealBrainCounts;
})();

;

/* === a-hint-upgrade-final === */

;

/* ═══ PISTAS ESPECÍFICAS POR PREGUNTA ═══
   Muestra directamente el tip de la pregunta actual,
   sin generalidades. Cada pista es única y útil.
*/
(function(){
  'use strict';

  function stripHTML(str){
    return String(str || '').replace(/<[^>]*>/g, '').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
  }

  function buildHintHTML(q){
    if(!q) return '<div style="font-size:13px;color:var(--text)">💡 Lee bien la oración completa antes de elegir.</div>';

    // Get the clean tip text
    var tipRaw = String(q.tip || '');
    var tipClean = stripHTML(tipRaw);

    // Category detection from the tip or question content
    var bag = [q.es, q.en, q.blank, q.opts && q.opts.join(' ')].join(' ').toLowerCase();
    var cat = '', icon = '💡';
    if(/\b(am|is|are)\b/.test(bag)) { cat='Verbo To Be'; icon='🔵'; }
    else if(/\b(was|were)\b/.test(bag)) { cat='Pasado To Be'; icon='⏪'; }
    else if(/\b(a\b|an\b|the\b)/.test(bag)) { cat='Artículos'; icon='🔤'; }
    else if(/\b(did|didn.*t|yesterday|ago|went|had|saw|bought|played|worked)\b/.test(bag)) { cat='Past Simple'; icon='⏪'; }
    else if(/\b(will|going to)\b/.test(bag)) { cat='Futuro'; icon='🔮'; }
    else if(/\b(does|doesn.*t|don.*t)\b/.test(bag)) { cat='Do / Does'; icon='❓'; }
    else if(/\b(can|could|should|must|may|might|would)\b/.test(bag)) { cat='Modal'; icon='⚙️'; }
    else if(/\b(never|always|usually|often|sometimes|rarely)\b/.test(bag)) { cat='Frecuencia'; icon='📊'; }
    else if(/ing\b/.test(bag)) { cat='Continuo'; icon='▶️'; }

    var html = '';
    if(cat){
      html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">'
            + '<span style="font-size:14px">'+icon+'</span>'
            + '<span style="font-size:10px;font-weight:900;letter-spacing:.10em;text-transform:uppercase;color:rgba(255,224,64,.75)">'+cat+'</span>'
            + '</div>';
    }

    // Main tip — use HTML from q.tip directly (it has <strong> tags)
    if(tipRaw.length >= 6){
      html += '<div style="font-size:13px;font-weight:700;line-height:1.65;color:rgba(232,234,255,.94)">'
            + tipRaw
            + '</div>';
    } else {
      html += '<div style="font-size:13px;font-weight:700;color:rgba(232,234,255,.94)">Lee bien la oración antes de responder.</div>';
    }

    return html;
  }

  var _boot = function(){
    if(window.__aHintUpgradeDone) return;
    window.__aHintUpgradeDone = true;

    window.useHint = function(){
      var n = typeof getHints === 'function' ? getHints() : 0;
      if(n <= 0) return;
      var answeredNow = false;
      try{ answeredNow = (typeof answered !== 'undefined' && answered === true); }catch(e){}
      if(answeredNow) return;

      if(typeof setHints === 'function') setHints(n - 1);
      else if(typeof state !== 'undefined' && state) state.hints = Math.max(0, n - 1);
      if(typeof saveState === 'function') saveState();
      if(typeof refreshHintsUI === 'function') refreshHintsUI();

      var q = null;
      try{
        if(typeof currentLevel !== 'undefined' && currentLevel && currentLevel.qs)
          q = currentLevel.qs[typeof currentQIndex !== 'undefined' ? currentQIndex : 0];
      }catch(e){}

      var toast = document.getElementById('hint-toast');
      var text  = document.getElementById('hint-toast-text');
      if(toast && text){
        text.innerHTML = buildHintHTML(q);
        toast.style.textAlign = 'left';
        toast.style.padding = '14px 16px';
        toast.classList.remove('show');
        void toast.offsetWidth;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(function(){ toast.classList.remove('show'); }, 7000);
      }

      // SFX
      try{
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(1047, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.22);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);
        o.connect(g); g.connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + 0.4);
      }catch(e){}
    };
  };

  function upgradeToastStyle(){
    var icon = document.querySelector('#hint-toast .hint-toast-icon');
    if(icon && !icon.__upgraded){
      icon.__upgraded = true;
      icon.textContent = '💡';
      icon.style.cssText = 'display:none';
    }
  }

  setTimeout(function(){ _boot(); upgradeToastStyle(); }, 100);
  setTimeout(function(){ _boot(); }, 600);
  document.addEventListener('DOMContentLoaded', function(){ _boot(); upgradeToastStyle(); });
})();

;

/* === socratic-hint-patch === */

;

(function(){
  'use strict';

  /* Generate a Socratic hint for verb-to-be questions */
  function socrHint(q){
    if(!q) return null;
    var opts = (q.opts || []).map(function(o){ return String(o).toLowerCase().trim(); });
    var blank = String(q.blank || '').toLowerCase().trim();

    /* Detect it's a to-be (am/is/are) question */
    var isToBeQ = (opts.indexOf('am') >= 0 && opts.indexOf('is') >= 0 && opts.indexOf('are') >= 0)
               || blank === 'am' || blank === 'is' || blank === 'are'
               || blank === "am not" || blank === "isn't" || blank === "aren't";
    if(!isToBeQ) return null;

    if(blank === 'is' || blank === "isn't"){
      return 'Si <strong>we / you / they</strong> van con <strong>are</strong>, e <strong>I</strong> va con <strong>am</strong>… ¿<strong>she / he / it</strong> va con: <strong>??</strong>';
    }
    if(blank === 'am' || blank === 'am not'){
      return 'Si <strong>we / you / they</strong> van con <strong>are</strong>, y <strong>she / he / it</strong> va con <strong>is</strong>… ¿<strong>I</strong> va con: <strong>??</strong>';
    }
    if(blank === 'are' || blank === "aren't"){
      return 'Si <strong>I</strong> va con <strong>am</strong>, y <strong>she / he / it</strong> va con <strong>is</strong>… ¿<strong>we / you / they</strong> van con: <strong>??</strong>';
    }
    return null;
  }

  function patchUseHint(){
    var orig = window.useHint;
    if(!orig || orig.__socrPatched) return;
    window.useHint = function(){
      var q = null;
      try{
        if(typeof currentLevel !== 'undefined' && currentLevel && currentLevel.qs)
          q = currentLevel.qs[typeof currentQIndex !== 'undefined' ? currentQIndex : 0];
      }catch(e){}

      var hint = socrHint(q);
      if(hint && q){
        var origTip = q.tip;
        q.tip = hint;
        orig.apply(this, arguments);
        q.tip = origTip;
      } else {
        orig.apply(this, arguments);
      }
    };
    window.useHint.__socrPatched = true;
  }

  /* Retry until __aHintUpgradeDone is set (the final useHint is installed) */
  var tries = 0;
  function tryPatch(){
    if(window.__aHintUpgradeDone){
      patchUseHint();
    } else if(++tries < 30){
      setTimeout(tryPatch, 200);
    }
  }
  setTimeout(tryPatch, 300);
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(tryPatch, 400); });
})();

;

/* === a-real-brains-and-global-hints-js === */

;

(function(){'use strict';
function c3(n){n=Number(n);return isFinite(n)?Math.max(0,Math.min(3,Math.round(n))):0}
function ws(){try{return window.WORLDS||(typeof WORLDS!='undefined'?WORLDS:[])}catch(e){return[]}}
function k(l){try{if(typeof levelKey=='function')return levelKey(l)}catch(e){}return l&&l.id!=null?'l_'+l.id:''}
function m(l){try{return c3((state&&state.medals&&state.medals[k(l)])||0)}catch(e){return 0}}
function bar(n){var d=document.createElement('div');d.className='a-level-minds brains-'+n;d.dataset.brains=String(n);d.setAttribute('aria-label',n+' cerebro'+(n==1?'':'s')+' ganado'+(n==1?'':'s'));for(var i=0;i<n;i++){var b=document.createElement('span');b.className='a-level-mind';b.textContent='🧠';d.appendChild(b)}return d}
function applyBrains(){var map=document.getElementById('screen-map'),W=ws();if(!map||!W.length)return;var blocks=[].slice.call(map.querySelectorAll('.world-block'));W.forEach(function(w,wi){var rows=blocks[wi]?[].slice.call(blocks[wi].querySelectorAll('.world-levels .level-row')):[];(w.levels||[]).forEach(function(l,li){var r=rows[li];if(!r)return;var n=m(l),old=r.querySelector('.a-level-minds'),same=old&&old.dataset.brains==String(n);r.classList.toggle('gold-mastered',n===3);r.classList.toggle('a-three-brains',n===3);r.classList.toggle('a-partial-brains',n>0&&n<3);if(same)return;r.querySelectorAll('.lv-badge.done,.brain-row-level,.level-brains,.level-stars,.brains-earned,.a-clean-brains-bar,.level-brains-earned,.a-exact-brain-bar,.a-level-brains-bar,.a-level-minds').forEach(function(x){x.remove()});if(n>0)r.appendChild(bar(n))})})}
var busy=0;function go(){if(busy)return;busy=1;requestAnimationFrame(function(){busy=0;applyBrains()})}
['renderMap','goToMap','continueFromComplete','finishLevel','saveState','loadProgress','show'].forEach(function(n){try{var f=window[n];if(typeof f=='function'&&!f.__realBrains){window[n]=function(){var r=f.apply(this,arguments);go();setTimeout(go,80);return r};window[n].__realBrains=1}}catch(e){}});
try{var map=document.getElementById('screen-map');if(map)new MutationObserver(go).observe(map,{childList:true,subtree:true})}catch(e){}
var dict={this:'esto / este',that:'eso / ese / aquel',these:'estos / estas',those:'esos / esas / aquellos',am:'va con I',is:'va con he / she / it o singular',are:'va con you / we / they o plural',was:'pasado singular: I / he / she / it',were:'pasado plural: you / we / they',a:'antes de sonido consonante',an:'antes de sonido vocal',the:'algo específico o conocido',do:'pregunta/negación con I / you / we / they',does:'pregunta/negación con he / she / it',did:'pasado: pregunta o negación',some:'afirmativas o cantidad positiva',any:'preguntas o negativas',much:'cantidad incontable',many:'cantidad contable plural',few:'pocos contables',little:'poco incontable',in:'dentro o periodos largos',on:'días o superficie',at:'hora exacta o punto',will:'decisión/predicción de futuro',going:'plan futuro con going to',more:'más con adjetivo largo',less:'menos',better:'mejor',best:'el mejor'};
function clean(x){return String(x||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim()}
function hint(q,l){if(!q)return'';var a=clean((q.opts&&q.opts[q.ans])||q.blank),opts=(q.opts||[]).map(clean).filter(Boolean),low=a.toLowerCase(),en=clean(q.en),es=clean(q.es),bits=[];opts.forEach(function(o){var d=dict[o.toLowerCase()];if(d)bits.push('si <strong>'+o+'</strong> es '+d)});if(bits.length<2){var t=(l&&l.name?l.name:'este tema');bits.push('mira el tema: <strong>'+t+'</strong>');bits.push('mira la idea en español: <strong>'+es+'</strong>')}
var why='';if(dict[low])why='Aquí toca <strong>'+a+'</strong> porque '+dict[low]+'.';else if(/ing$/i.test(a))why='Aquí toca <strong>'+a+'</strong> porque la acción está en progreso: am/is/are + verbo en <strong>-ing</strong>.';else if(/ed$/i.test(a))why='Aquí toca <strong>'+a+'</strong> porque la oración habla del pasado.';else if(/s$/i.test(a)&&!/ss$/i.test(a))why='Aquí toca <strong>'+a+'</strong>: revisa si la palabra necesita plural, tercera persona o concordancia.';else why='Aquí toca <strong>'+a+'</strong> porque completa mejor la estructura de la oración.';
return '<strong>Pista:</strong> '+bits.slice(0,3).join(', ')+'. Entonces, en <em>'+en+'</em>, ¿qué opción encaja? '+why}
function applyHints(){ws().forEach(function(w){(w.levels||[]).forEach(function(l){(l.qs||[]).forEach(function(q){q.tip=hint(q,l)})})})}
function boot(){applyHints();go();setTimeout(go,120)}
document.addEventListener('DOMContentLoaded',boot);setTimeout(boot,0);setTimeout(boot,800);window.aApplyRealBrains=go;window.aApplyGlobalHints=applyHints;
})();

;

/* === a-ander-v3-final-js === */

;

(function(){
  'use strict';
  var MARK = '__anderV3';

  /* ── CEREBROS en el mapa ── */
  function getMedal(level){
    try{ return (window.state&&window.state.medals&&window.state.medals[window.levelKey(level)])||0; }
    catch(e){ return 0; }
  }

  function drawBrains(row, level){
    if(!row||!level) return;
    // Quitar pills anteriores
    row.querySelectorAll('.a-level-minds').forEach(function(x){ x.remove(); });

    var n = getMedal(level);
    if(n<=0) return;

    var bar = document.createElement('div');
    bar.className='a-level-minds brains-'+n;
    for(var i=0;i<n;i++){
      var s=document.createElement('span');
      s.className='a-level-mind';
      s.textContent='🧠';
      bar.appendChild(s);
    }
    row.appendChild(bar);
  }

  function refreshBrains(){
    if(!window.WORLDS) return;
    window.WORLDS.forEach(function(world, wi){
      var worldBlock = document.querySelectorAll('#screen-map .world-block')[wi];
      if(!worldBlock) return;
      var rows = Array.prototype.slice.call(worldBlock.querySelectorAll('.level-row'));
      (world.levels||[]).forEach(function(level, li){
        if(rows[li]) drawBrains(rows[li], level);
      });
    });
  }

  // Ejecutar después de renderMap
  if(typeof window.renderMap==='function' && !window.renderMap[MARK]){
    var _rM=window.renderMap;
    window.renderMap=function(){ var r=_rM.apply(this,arguments); setTimeout(refreshBrains,0); return r; };
    window.renderMap[MARK]=true;
  }

  // También refrescar al volver al mapa
  if(typeof window.goToMap==='function' && !window.goToMap[MARK]){
    var _gM=window.goToMap;
    window.goToMap=function(){ var r=_gM.apply(this,arguments); setTimeout(refreshBrains,80); return r; };
    window.goToMap[MARK]=true;
  }
  if(typeof window.continueFromComplete==='function' && !window.continueFromComplete[MARK]){
    var _cFC=window.continueFromComplete;
    window.continueFromComplete=function(){ var r=_cFC.apply(this,arguments); setTimeout(refreshBrains,80); return r; };
    window.continueFromComplete[MARK]=true;
  }

  // Boot
  function boot(){
    var fb=el('q-fb'); if(fb && !fb.classList.contains('show')) hideFb();
    refreshBrains();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
  setTimeout(refreshBrains,300);
  setTimeout(refreshBrains,1200);
})();

;

/* === a-mutobs-final-patch === */

;

(function(){
  'use strict';

  /* ── Guards anti-loop ───────────────────────────────────────── */
  var _fbBusy   = false;
  var _hintBusy = false;

  /* ── Helper: pregunta actual ─────────────────────────────────── */
  function currentQ() {
    try {
      var lvl = window.currentLevel;
      var idx = (typeof window.currentQIndex === 'number') ? window.currentQIndex : 0;
      return (lvl && lvl.qs && lvl.qs[idx]) || null;
    } catch(e) { return null; }
  }

  function strip(s) {
    return String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  /* ══════════════════════════════════════════════════════════════
     FEEDBACK: ✅/❌ + Regla gramatical + Ejemplo con respuesta
     ══════════════════════════════════════════════════════════════ */
  function buildFeedback(q, isCorrect) {
    var correct  = strip(q.blank || (q.opts && q.opts[q.ans]) || '');
    var info     = getRule(q, correct);
    /* Oración completa con la respuesta subrayada y en negrita */
    var example  = String(q.en || '').replace(
      '___',
      '<strong>' + correct + '</strong>'
    );

    if (isCorrect) {
      return '<div class="a-fb-row">'
           +   '<span class="a-fb-badge">✅ Correcto</span>'
           +   '<span class="a-fb-answer">' + correct + '</span>'
           + '</div>'
           + '<p class="a-fb-rule">' + info.rule + '</p>'
           + '<p class="a-fb-example">→ ' + example + '</p>';
    } else {
      return '<div class="a-fb-row">'
           +   '<span class="a-fb-badge">❌ Era</span>'
           +   '<span class="a-fb-answer">' + correct + '</span>'
           + '</div>'
           + '<p class="a-fb-rule">' + info.rule + '</p>'
           + '<p class="a-fb-example">→ ' + example + '</p>';
    }
  }

  /* Regla gramatical según la respuesta correcta */
  function getRule(q, correct) {
    var low = correct.toLowerCase();
    var en  = String(q.en  || '').toLowerCase();
    var es  = String(q.es  || '');
    var lvlName = (window.currentLevel && window.currentLevel.name) || '';

    /* ─ To Be ─ */
    if (low === 'am')
      return { rule: '<strong>I → am.</strong> El verbo "to be" solo usa <em>am</em> con I.' };
    if (low === 'is')
      return { rule: '<strong>He / She / It → is.</strong> Singular de tercera persona.' };
    if (low === 'are')
      return { rule: '<strong>You / We / They → are.</strong> Segunda persona y plurales.' };
    if (low === "isn't" || low === 'is not')
      return { rule: '<strong>Negativo singular:</strong> is + not → <em>isn\'t</em>. (He/She/It isn\'t...)' };
    if (low === "aren't" || low === 'are not')
      return { rule: '<strong>Negativo plural:</strong> are + not → <em>aren\'t</em>. (You/We/They aren\'t...)' };
    if (low === 'am not')
      return { rule: '<strong>Negativo con I:</strong> I am not. (No existe contracción *amn\'t en inglés estándar.)' };
    if (low === "was")
      return { rule: '<strong>Pasado singular:</strong> I / He / She / It → <em>was</em>.' };
    if (low === "were")
      return { rule: '<strong>Pasado plural:</strong> You / We / They → <em>were</em>.' };

    /* ─ Artículos ─ */
    if (low === 'a')
      return { rule: '<strong>a</strong> + consonante: "a cat", "a book". La siguiente palabra empieza por sonido consonántico.' };
    if (low === 'an')
      return { rule: '<strong>an</strong> + vocal: "an apple", "an hour". La siguiente palabra empieza por sonido vocálico.' };
    if (low === 'the')
      return { rule: '<strong>the</strong> = algo concreto, único o ya mencionado. ("The sun", "The president")' };

    /* ─ Do / Does / Did ─ */
    if (low === "don't" || low === 'do not')
      return { rule: '<strong>I / You / We / They → don\'t.</strong> Negación del presente simple.' };
    if (low === "doesn't" || low === 'does not')
      return { rule: '<strong>He / She / It → doesn\'t.</strong> Negación del presente simple en 3ª persona.' };
    if (low === 'do')
      return { rule: '<strong>Do</strong> abre preguntas con I / You / We / They en presente.' };
    if (low === 'does')
      return { rule: '<strong>Does</strong> abre preguntas con He / She / It. El verbo va en forma base (sin -s).' };
    if (low === 'did')
      return { rule: '<strong>Did</strong> abre preguntas en pasado. El verbo va en forma base.' };

    /* ─ Have ─ */
    if (low === "haven't" || low === 'have not')
      return { rule: '<strong>I / You / We / They → haven\'t.</strong> Presente perfecto negativo.' };
    if (low === "hasn't" || low === 'has not')
      return { rule: '<strong>He / She / It → hasn\'t.</strong> Presente perfecto negativo, 3ª persona.' };

    /* ─ Pronombres ─ */
    if (low === 'he')  return { rule: '<strong>He</strong> = pronombre masculino singular.' };
    if (low === 'she') return { rule: '<strong>She</strong> = pronombre femenino singular.' };
    if (low === 'it')  return { rule: '<strong>It</strong> = cosas, animales o sujeto de clima/tiempo.' };
    if (low === 'we')  return { rule: '<strong>We</strong> = yo + otras personas juntas.' };
    if (low === 'they')return { rule: '<strong>They</strong> = varias personas o cosas.' };

    /* ─ This / That / These / Those ─ */
    if (low === 'this')  return { rule: '<strong>This</strong> = este/esta — singular y cerca.' };
    if (low === 'that')  return { rule: '<strong>That</strong> = ese/aquel — singular y lejos.' };
    if (low === 'these') return { rule: '<strong>These</strong> = estos/estas — plural y cerca.' };
    if (low === 'those') return { rule: '<strong>Those</strong> = esos/aquellos — plural y lejos.' };

    /* ─ Presentes continuos (-ing) ─ */
    if (/ing$/.test(low))
      return { rule: 'Presente continuo: <strong>am / is / are + verbo-ing.</strong> Acción en progreso ahora mismo.' };

    /* ─ Pasado regular (-ed) ─ */
    if (/ed$/.test(low) && !/need/.test(low))
      return { rule: 'Pasado regular: <strong>verbo + -ed</strong>. (' + correct + ' = acción terminada en el pasado.)' };

    /* ─ Plural ─ */
    if (/ies$/.test(low))
      return { rule: 'Plural: la <strong>y</strong> final cambia a <strong>-ies</strong>. (baby → babies, city → cities)' };
    if (/ches$|shes$|xes$|ses$/.test(low))
      return { rule: 'Plural: se añade <strong>-es</strong> cuando la palabra termina en ch, sh, x, s.' };
    if (/s$/.test(low) && !/ss$/.test(low) && !/ous$/.test(low)) {
      if (en.indexOf(' she ') !== -1 || en.indexOf('he ') === 0 || en.indexOf(' he ') !== -1)
        return { rule: '3ª persona singular: <strong>He / She / It → verbo + -s</strong> en presente simple.' };
      return { rule: 'Plural regular: sustantivo + <strong>-s</strong>.' };
    }

    /* ─ Comparativos ─ */
    if (low === 'better') return { rule: '<strong>Better</strong> = mejor. Comparativo irregular de "good".' };
    if (low === 'worse')  return { rule: '<strong>Worse</strong> = peor. Comparativo irregular de "bad".' };
    if (low === 'more')   return { rule: 'Adjetivos largos usan <strong>more</strong> + adjetivo para el comparativo.' };

    /* ─ Adverbios de frecuencia ─ */
    var freqs = {
      always:    'Frecuencia 100%. Va antes del verbo principal: <em>I always arrive on time.</em>',
      usually:   'Frecuencia ~80%. Va antes del verbo: <em>She usually works from home.</em>',
      often:     'Frecuencia alta. Va antes del verbo: <em>We often eat out.</em>',
      sometimes: 'Frecuencia media. Puede ir al inicio o antes del verbo.',
      rarely:    'Frecuencia muy baja. Con sentido casi negativo, el verbo va en positivo.',
      never:     'Frecuencia 0%. Tiene sentido negativo — el verbo NO lleva "not".',
      ever:      'En preguntas: <em>Have you ever been...?</em> = ¿Alguna vez en tu vida...?'
    };
    if (freqs[low]) return { rule: '<strong>' + correct + '</strong>: ' + freqs[low] };

    /* ─ Phrasal verbs comunes ─ */
    if (low === 'up' && en.indexOf('wake') !== -1)
      return { rule: '<strong>Wake up</strong> = despertarse. Los phrasal verbs son fijos — no se puede cambiar la partícula.' };
    if (low === 'up' && en.indexOf('keep') !== -1)
      return { rule: '<strong>Keep up</strong> = mantener el ritmo / seguir así.' };
    if (low === 'out' && en.indexOf('work') !== -1)
      return { rule: '<strong>Work out</strong> = resultar bien / hacer ejercicio. Phrasal verb de resultado.' };
    if (low === 'up' && en.indexOf('follow') !== -1)
      return { rule: '<strong>Follow up</strong> = hacer seguimiento. Expresión de trabajo habitual.' };

    /* ─ Contracciones ─ */
    if (low === "i'm")    return { rule: '<strong>I\'m</strong> = I am. Las contracciones son obligatorias en inglés hablado.' };
    if (low === "you're") return { rule: '<strong>You\'re</strong> = You are. Cuidado: no confundir con "your" (tu).' };
    if (low === "he's")   return { rule: '<strong>He\'s</strong> = He is (o He has en perfecto).' };
    if (low === "she's")  return { rule: '<strong>She\'s</strong> = She is (o She has en perfecto).' };
    if (low === "we're")  return { rule: '<strong>We\'re</strong> = We are.' };
    if (low === "they're")return { rule: '<strong>They\'re</strong> = They are. Diferente de "their" (su) y "there" (ahí).' };
    if (low === "it's")   return { rule: '<strong>It\'s</strong> = It is. No confundir con "its" (su, de ello).' };

    /* ─ Vocabulario específico inferido del nivel ─ */
    if (lvlName.toLowerCase().indexOf('weather') !== -1 || lvlName.toLowerCase().indexOf('tiempo') !== -1)
      return { rule: 'En inglés, el tiempo atmosférico siempre usa el sujeto impersonal <strong>It</strong>: "It\'s sunny / rainy / cold."' };

    /* ─ Fallback contextual ─ */
    return { rule: 'En "<em>' + es + '</em>", la opción que encaja es <strong>' + correct + '</strong>. Recuerda esta combinación.' };
  }

  /* ══════════════════════════════════════════════════════════════
     PISTA: solo la letra inicial, con diseño propio
     ══════════════════════════════════════════════════════════════ */
  function buildHint(q) {
    var correct = strip(q.blank || (q.opts && q.opts[q.ans]) || '');
    var first   = correct.charAt(0).toUpperCase();
    return '<span class="a-hint-label">Pista</span>'
         + '<span class="a-hint-letter">' + first + '</span>'
         + '<span class="a-hint-desc">Primera letra de la respuesta</span>';
  }

  /* ══════════════════════════════════════════════════════════════
     MutationObservers
     ══════════════════════════════════════════════════════════════ */
  function installFbObserver() {
    var fb = document.getElementById('q-fb');
    if (!fb) return;

    new MutationObserver(function() {
      if (_fbBusy) return;
      if (!fb.classList.contains('show')) return;

      var q = currentQ();
      if (!q) return;

      var html = buildFeedback(q, fb.classList.contains('ok'));
      if (fb.innerHTML === html) return;

      _fbBusy = true;
      try { fb.innerHTML = html; } finally { _fbBusy = false; }
    }).observe(fb, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ['class']
    });
  }

  function installHintObserver() {
    var box = document.getElementById('hint-toast-text');
    if (!box) return;

    new MutationObserver(function() {
      if (_hintBusy) return;
      if (!box.innerHTML) return;

      var q = currentQ();
      if (!q) return;

      var html = buildHint(q);
      if (box.innerHTML === html) return;

      _hintBusy = true;
      try { box.innerHTML = html; } finally { _hintBusy = false; }
    }).observe(box, { childList: true, subtree: true, characterData: true });
  }

  /* ── Boot ──────────────────────────────────────────────────── */
  function boot() {
    installFbObserver();
    installHintObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  setTimeout(boot, 500);

})();

;

/* === a-final-content-visible-feedback-hints-patch === */

;

(function(){
  'use strict';

  function esc(v){
    return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function correctValue(q){
    if(!q) return '';
    if(typeof q.blank === 'string' && q.blank.trim()) return q.blank.trim().split('/')[0].trim();
    if(Array.isArray(q.opts)){
      var idx = Array.isArray(q.validAns) ? q.validAns[0] : q.ans;
      if(q.opts[idx] != null) return String(q.opts[idx]).trim();
    }
    return '';
  }

  function filledSentence(q){
    if(!q) return 'She is happy.';
    var word = correctValue(q) || 'is';
    var sentence = String(q.en || '').replace('___', word).replace(/\s+/g,' ').trim();
    if(!sentence) sentence = 'She is happy.';
    return sentence;
  }

  function cleanTip(q){
    var tip = String((q && q.tip) || '').trim();
    tip = tip.replace(/^\s*(💡|✨|✅|❌|Pista:)\s*/i,'').trim();
    if(!tip) tip = 'La respuesta encaja con la gramática y el sentido de la oración.';
    return tip;
  }

  function reasonFor(q, chosenIdx, correct){
    var ans = correctValue(q);
    var chosen = q && Array.isArray(q.opts) && q.opts[chosenIdx] != null ? String(q.opts[chosenIdx]).trim() : '';
    if(correct){
      return '"' + ans + '" completa la oración de forma natural y correcta.';
    }
    if(chosen){
      return '"' + chosen + '" no encaja aquí; la forma correcta es "' + ans + '".';
    }
    return 'La opción elegida no encaja; la forma correcta es "' + ans + '".';
  }

  function shortExplanation(q){
    var ans = correctValue(q);
    var tip = cleanTip(q);
    if(tip.length > 145) tip = tip.slice(0,142).replace(/\s+\S*$/,'') + '...';
    if(ans){
      return tip;
    }
    return 'Mira el sujeto, el tiempo y la idea de la frase antes de elegir.';
  }

  function feedbackHTML(q, chosenIdx, correct){
    return '' +
      '<div class="a-new-fb-title">' + (correct ? '✅ Correcto' : '❌ Incorrecto') + '</div>' +
      '<div class="a-new-fb-grid">' +
        '<div class="a-new-fb-line"><b>Razón:</b> ' + esc(reasonFor(q, chosenIdx, correct)) + '</div>' +
        '<div class="a-new-fb-line"><b>Explicación breve:</b> ' + esc(shortExplanation(q)) + '</div>' +
        '<div class="a-new-fb-line"><b>Ejemplo:</b> ' + esc(filledSentence(q)) + '</div>' +
      '</div>';
  }

  function showNextSafe(){
    var btn = document.getElementById('btn-next');
    if(btn) btn.className = 'btn-next show';
  }

  function validAnswers(q){
    if(!q) return [];
    return Array.isArray(q.validAns) ? q.validAns : [q.ans];
  }

  function refreshHintButtonSafe(){
    try{ if(typeof refreshHintsUI === 'function') refreshHintsUI(); }catch(e){}
    var btn = document.getElementById('btn-hint');
    try{
      if(btn && typeof answered !== 'undefined'){
        var n = (typeof getHints === 'function') ? getHints() : ((typeof state !== 'undefined' && state && state.hints) || 0);
        btn.disabled = n <= 0 || answered === true;
      }
    }catch(e){}
  }

  var baseRenderQ = window.renderQ;
  window.renderQ = function(){
    if(baseRenderQ) baseRenderQ.apply(this, arguments);
    var fb = document.getElementById('q-fb');
    if(fb){
      fb.className = 'fb-box';
      fb.innerHTML = '';
    }
    refreshHintButtonSafe();
  };

  var baseSelectAns = window.selectAns;
  window.selectAns = function(idx){
    try{
      if(typeof answered !== 'undefined' && answered) return;
      var q = currentLevel && currentLevel.qs && currentLevel.qs[currentQIndex];
      if(!q || !Array.isArray(q.opts)){
        return baseSelectAns && baseSelectAns.apply(this, arguments);
      }

      answered = true;
      var opts = document.getElementById('q-opts') ? document.getElementById('q-opts').children : [];
      var validSet = validAnswers(q);
      var correct = validSet.indexOf(idx) !== -1;

      validSet.forEach(function(vi){ if(opts[vi]) opts[vi].classList.add('correct'); });
      if(!correct && opts[idx]) opts[idx].classList.add('wrong');
      Array.prototype.forEach.call(opts, function(o,i){
        if(validSet.indexOf(i) === -1 && i !== idx) o.classList.add('disabled');
      });

      var blank = document.getElementById('blank-span');
      if(blank) blank.textContent = correctValue(q);

      var qCard = document.querySelector('.q-card');
      var fb = document.getElementById('q-fb');

      if(correct){
        sessionCorrect++;
        sessionCorrectStreak++;
        sessionMaxCorrectStreak = Math.max(sessionMaxCorrectStreak, sessionCorrectStreak);
        var wasComeback = sessionWrongStreak >= 2;
        sessionWrongStreak = 0;
        try{ if(typeof calculateDynamicGain === 'function') calculateDynamicGain(true, opts[validSet[0]] || null); }catch(e){}
        try{ if(sessionCorrectStreak === 3 && typeof showPhilosophy === 'function') showPhilosophy('correct3'); }catch(e){}
        try{ if(sessionCorrectStreak === 5 && typeof showPhilosophy === 'function') showPhilosophy('correct5'); }catch(e){}
        try{ if(wasComeback && typeof showPhilosophy === 'function') showPhilosophy('recuperación'); }catch(e){}
        if(fb){ fb.className = 'fb-box ok show'; fb.innerHTML = feedbackHTML(q, idx, true); }
        try{ if(typeof SFX !== 'undefined' && SFX.correct) SFX.correct(); }catch(e){}
        if(qCard){ qCard.classList.remove('flash-green','flash-red'); void qCard.offsetWidth; qCard.classList.add('flash-green'); }
        try{
          var correctOpt = opts[validSet[0]];
          if(correctOpt && typeof spawnStars === 'function'){
            var r = correctOpt.getBoundingClientRect();
            spawnStars(r.left + r.width/2, r.top, 4);
          }
        }catch(e){}
      } else {
        sessionWrongStreak++;
        sessionCorrectStreak = 0;
        sessionHadWrong = true;
        try{ if(sessionWrongStreak === 2 && typeof showPhilosophy === 'function') showPhilosophy('wrong2'); }catch(e){}
        try{ if(sessionWrongStreak === 5 && typeof showPhilosophy === 'function') showPhilosophy('wrong5'); }catch(e){}
        try{ if(typeof addSessionXp === 'function') addSessionXp(3 + Math.floor(Math.random() * 6), 'Intento', null); }catch(e){}
        if(fb){ fb.className = 'fb-box ko show'; fb.innerHTML = feedbackHTML(q, idx, false); }
        if(qCard){ qCard.classList.remove('flash-green','flash-red'); void qCard.offsetWidth; qCard.classList.add('flash-red'); }
        try{
          var n = (typeof getHints === 'function') ? getHints() : 0;
          if(n < 5 && typeof earnHint === 'function') earnHint(opts[idx] || null);
        }catch(e){}
      }

      try{
        if(typeof refreshStreakBadge === 'function'){
          if(correct) refreshStreakBadge(sessionCorrectStreak);
          else refreshStreakBadge(0);
        }
      }catch(e){}

      var hintBtn = document.getElementById('btn-hint');
      if(hintBtn) hintBtn.disabled = true;
      showNextSafe();
    }catch(err){
      if(baseSelectAns) return baseSelectAns.apply(this, arguments);
      throw err;
    }
  };

  var baseUseHint = window.useHint;
  window.useHint = function(){
    try{
      var q = currentLevel && currentLevel.qs && currentLevel.qs[currentQIndex];
      var n = (typeof getHints === 'function') ? getHints() : ((typeof state !== 'undefined' && state && state.hints) || 0);
      if(!q || n <= 0 || (typeof answered !== 'undefined' && answered)) return;

      if(typeof setHints === 'function') setHints(n - 1);
      else if(typeof state !== 'undefined' && state) state.hints = Math.max(0, n - 1);
      try{ if(typeof saveState === 'function') saveState(); }catch(e){}
      try{ if(typeof refreshHintsUI === 'function') refreshHintsUI(); }catch(e){}

      var ans = correctValue(q);
      var lead = ans ? ans.slice(0, Math.min(2, ans.length)).toLowerCase() : '';
      var msg = 'La palabra correcta comienza con: ' + lead;

      if(typeof showHintToast === 'function') showHintToast(msg);
      else {
        var toast = document.getElementById('hint-toast');
        var text = document.getElementById('hint-toast-text');
        if(toast && text){
          text.textContent = msg;
          toast.classList.remove('show');
          void toast.offsetWidth;
          toast.classList.add('show');
          clearTimeout(toast._t);
          toast._t = setTimeout(function(){ toast.classList.remove('show'); }, 4200);
        }
      }
    }catch(e){
      if(baseUseHint) return baseUseHint.apply(this, arguments);
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    try{
      if(Array.isArray(window.WORLDS)){
        window.WORLDS.forEach(function(w){
          (w.levels || []).forEach(function(l){
            (l.qs || []).forEach(function(q){
              q.reason = reasonFor(q, q.ans, true);
              q.shortExplanation = shortExplanation(q);
              q.example = filledSentence(q);
            });
          });
        });
      }
    }catch(e){}
  });
})();

;

/* === ander-feedback-razon-only-v2-js === */

;

(function(){
  'use strict';

  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function strip(v){return String(v==null?'':v).replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();}
  function lower(v){return strip(v).toLowerCase();}
  function getQ(){try{if(typeof currentLevel!=='undefined'&&currentLevel&&currentLevel.qs&&typeof currentQIndex!=='undefined')return currentLevel.qs[currentQIndex];}catch(e){} return null;}
  function indexes(q){var a=[]; if(!q)return a; if(Array.isArray(q.validAns))a=q.validAns.slice(); else if(Array.isArray(q.corrects))a=q.corrects.slice(); else if(Array.isArray(q.accept))a=q.accept.slice(); else if(Number.isFinite(Number(q.ans)))a=[Number(q.ans)]; return a.map(Number).filter(function(n){return Number.isFinite(n);});}
  function answer(q){if(!q)return''; var ids=indexes(q); if(Array.isArray(q.opts)&&ids.length&&q.opts[ids[0]]!=null)return strip(q.opts[ids[0]]); if(typeof q.blank==='string')return strip(q.blank.split('/')[0]); return '';}
  function selected(q,i){return Array.isArray(q&&q.opts)&&q.opts[Number(i)]!=null?strip(q.opts[Number(i)]):'';}

  var meanings={
    'never':'significa “nunca”', 'always':'significa “siempre”', 'sometimes':'significa “a veces”', 'usually':'significa “normalmente”',
    'not':'marca negación, pero no significa “nunca” por sí sola', 'no':'puede significar “no/ningún”, pero aquí no completa bien la idea',
    'am':'va con “I”', 'is':'va con he, she, it o una cosa/persona singular', 'are':'va con you, we, they o plural',
    'a':'se usa antes de sonido consonante', 'an':'se usa antes de sonido vocal', 'the':'habla de algo específico',
    'my':'significa “mi”', 'your':'significa “tu/su”', 'his':'significa “su” de él', 'her':'significa “su” de ella', 'our':'significa “nuestro/a”', 'their':'significa “su” de ellos'
  };

  function topic(q){
    var txt=lower((q&&q.es)+' '+(q&&q.en)+' '+(q&&q.name)+' '+(q&&q.topic));
    if(/nunca|never|negaci|not|no|don't|doesn't|didn't/.test(txt))return'negación';
    if(/am|is|are|was|were|to be|soy|eres|está|son/.test(txt))return'to be';
    if(/a|an|the|artículo|un |una /.test(txt))return'artículos';
    if(/my|your|his|her|our|their|mi|tu|su|nuestro/.test(txt))return'posesivos';
    if(/\?|pregunta|do|does|did/.test(txt))return'preguntas';
    return'estructura';
  }

  function ideaSpanish(q){
    var es=strip(q&&q.es);
    return es ? ' La idea en español es: “'+es+'”.' : '';
  }

  function reason(q,i,ok){
    var ans=answer(q), sel=selected(q,i), ansLow=lower(ans), selLow=lower(sel), t=topic(q);
    var ansMeaning=meanings[ansLow] || 'es la palabra que mantiene el sentido de la frase';
    var selMeaning=meanings[selLow] || 'no lleva la idea exacta que pide esta oración';

    if(ok){
      if(t==='negación') return '“'+ans+'” sí funciona porque '+ansMeaning+' y conecta directo con la idea negativa de la frase.'+ideaSpanish(q)+' Sigue así: estás entrenando el oído para elegir por sentido, no por adivinar.';
      if(t==='to be') return '“'+ans+'” sí funciona porque es la forma que corresponde con el sujeto de la oración. En inglés, el verbo cambia según quién hace o es algo. Sigue así: cada respuesta correcta afina tu gramática.';
      if(t==='artículos') return '“'+ans+'” sí funciona porque el artículo debe sonar natural antes de la palabra que viene después. Sigue así: esto se aprende como ritmo, casi como música.';
      if(t==='posesivos') return '“'+ans+'” sí funciona porque muestra correctamente de quién es algo en la oración. Sigue así: estás conectando significado y estructura.';
      if(t==='preguntas') return '“'+ans+'” sí funciona porque ayuda a formar la pregunta con el orden natural del inglés. Sigue así: vas construyendo la frase como piezas de Lego.';
      return '“'+ans+'” sí funciona porque conserva el sentido completo de la oración y suena natural en inglés. Sigue así: vas entrenando precisión.';
    }

    if(t==='negación') return '“'+sel+'” no es la mejor opción aquí porque '+selMeaning+'. La palabra correcta es “'+ans+'”, porque '+ansMeaning+' y expresa justo la idea que pide la frase.'+ideaSpanish(q)+' Sigue aprendiendo: este tipo de detalle es el que vuelve natural tu inglés.';
    if(t==='to be') return '“'+sel+'” no va aquí porque el verbo to be depende del sujeto. La forma correcta es “'+ans+'”, que es la que encaja con esa persona o cosa. Sigue aprendiendo: estás ajustando la brújula gramatical.';
    if(t==='artículos') return '“'+sel+'” no suena natural en esta frase. La forma correcta es “'+ans+'”, porque el artículo se elige por cómo empieza y qué tan específica es la palabra siguiente. Sigue aprendiendo: aquí manda el sonido y el contexto.';
    if(t==='posesivos') return '“'+sel+'” cambia quién posee o a quién pertenece algo. La opción correcta es “'+ans+'”, porque mantiene clara esa relación. Sigue aprendiendo: en posesivos, una palabra cambia todo el mapa.';
    if(t==='preguntas') return '“'+sel+'” rompe el orden natural de la pregunta. La opción correcta es “'+ans+'”, porque ayuda a que la frase pregunte de forma clara. Sigue aprendiendo: preguntar en inglés es ordenar bien las piezas.';
    return '“'+sel+'” no conserva bien el sentido de la oración. La opción correcta es “'+ans+'”, porque completa la frase de forma más natural y precisa. Sigue aprendiendo: cada intento te acerca al patrón correcto.';
  }

  function fb(q,i,ok){
    return '<div class="xp-fb-title">'+(ok?'✅ Correcto':'🟡 Casi')+'</div><p class="xp-fb-reason"><b>Razón:</b> '+esc(reason(q,i,ok))+'</p>';
  }

  function hintLead(q){var a=answer(q).toLowerCase().replace(/[^a-záéíóúüñ]/gi,''); return a?a.charAt(0)+'-':'';}
  function toast(msg){var t=document.getElementById('hint-toast'), x=document.getElementById('hint-toast-text'); if(t&&x){x.textContent=msg;t.classList.remove('show');void t.offsetWidth;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('show');},3300);}}
  function refreshHints(){try{if(typeof refreshHintsUI==='function')refreshHintsUI();}catch(e){}}

  function safeHint(){
    var q=getQ(); if(!q)return;
    try{if(typeof answered!=='undefined'&&answered)return;}catch(e){}
    var n=0; try{n=typeof getHints==='function'?getHints():((typeof state!=='undefined'&&state&&state.hints)||0);}catch(e){}
    if(n<=0)return;
    try{if(typeof setHints==='function')setHints(n-1);else if(typeof state!=='undefined'&&state)state.hints=Math.max(0,n-1);}catch(e){}
    try{if(typeof saveState==='function')saveState();}catch(e){}
    refreshHints();
    toast('La palabra correcta comienza con: '+hintLead(q));
  }

  function awardHintOnWrong(anchor){
    try{
      var n=typeof getHints==='function'?getHints():((typeof state!=='undefined'&&state&&state.hints)||0);
      if(n>=5)return;
      if(typeof earnHint==='function') earnHint(anchor||null);
      else {
        if(typeof setHints==='function') setHints(n+1);
        else if(typeof state!=='undefined'&&state) state.hints=Math.min(5,n+1);
        try{if(typeof saveState==='function')saveState();}catch(e){}
        refreshHints();
      }
    }catch(e){}
  }

  function safeSelect(i){
    try{
      if(typeof answered!=='undefined'&&answered)return;
      var q=getQ(); if(!q)return;
      answered=true;
      var opts=[].slice.call(document.querySelectorAll('#q-opts .opt'));
      var valid=indexes(q); var ok=valid.indexOf(Number(i))!==-1;
      valid.forEach(function(v){if(opts[v])opts[v].classList.add('correct');});
      if(!ok&&opts[i])opts[i].classList.add('wrong');
      opts.forEach(function(o,idx){if(valid.indexOf(idx)===-1&&idx!==Number(i))o.classList.add('disabled');});
      var blank=document.getElementById('blank-span'); if(blank)blank.textContent=answer(q);
      var fbEl=document.getElementById('q-fb'); if(fbEl){fbEl.className='fb-box '+(ok?'ok':'ko')+' show';fbEl.innerHTML=fb(q,i,ok);}
      var next=document.getElementById('btn-next'); if(next){next.style.display='block';next.className='btn-next show';}
      var hb=document.getElementById('btn-hint'); if(hb)hb.disabled=true;
      var card=document.querySelector('.q-card'); if(card){card.classList.remove('flash-green','flash-red');void card.offsetWidth;card.classList.add(ok?'flash-green':'flash-red');}
      try{
        if(ok){
          sessionCorrect++; sessionCorrectStreak++; sessionMaxCorrectStreak=Math.max(sessionMaxCorrectStreak,sessionCorrectStreak); sessionWrongStreak=0;
          if(typeof calculateDynamicGain==='function')calculateDynamicGain(true,opts[valid[0]]||null);
          if(typeof SFX!=='undefined'&&SFX.correct)SFX.correct();
        }else{
          sessionCorrectStreak=0; sessionWrongStreak++; sessionHadWrong=true;
          if(typeof addSessionXp==='function')addSessionXp(3+Math.floor(Math.random()*6),'Intento',null);
          awardHintOnWrong(opts[i]||null);
        }
      }catch(e){}
      try{if(typeof refreshStreakBadge==='function')refreshStreakBadge(ok?sessionCorrectStreak:0);}catch(e){}
    }catch(e){console.error('EnglishXP select patch:',e);}
  }

  function cleanAfterRender(){
    var f=document.getElementById('q-fb'); if(f){f.className='fb-box';f.innerHTML='';}
    refreshHints();
  }

  try{useHint=safeHint; window.useHint=safeHint;}catch(e){window.useHint=safeHint;}
  try{selectAns=safeSelect; window.selectAns=safeSelect;}catch(e){window.selectAns=safeSelect;}
  try{var oldRender=renderQ; renderQ=function(){oldRender&&oldRender.apply(this,arguments);setTimeout(cleanAfterRender,0);}; window.renderQ=renderQ;}catch(e){}
  document.addEventListener('click',function(ev){
    var h=ev.target&&ev.target.closest&&ev.target.closest('#btn-hint,[onclick*="useHint"]');
    if(h){ev.preventDefault();ev.stopImmediatePropagation();safeHint();}
  },true);
})();

;

/* === ander-final-real-level-brains-responsive-js === */

;

(function(){
  'use strict';
  var BAR = 'ander-real-brain-bar';
  var BRAIN = 'ander-real-brain';
  var PATCHED = '__anderFinalRealBrainsResponsive';

  function clamp3(value){
    value = Number(value);
    if(!isFinite(value)) return 0;
    return Math.max(0, Math.min(3, Math.round(value)));
  }

  function worlds(){
    try{ if(window.WORLDS && Array.isArray(window.WORLDS)) return window.WORLDS; }catch(e){}
    try{ if(typeof WORLDS !== 'undefined' && Array.isArray(WORLDS)) return WORLDS; }catch(e){}
    return [];
  }

  function keyFor(level){
    try{ if(typeof window.levelKey === 'function') return String(window.levelKey(level)); }catch(e){}
    try{ if(typeof levelKey === 'function') return String(levelKey(level)); }catch(e){}
    if(level && level.id !== undefined && level.id !== null) return 'l_' + String(level.id);
    return '';
  }

  function medalFor(level){
    var key = keyFor(level);
    if(!key) return 0;
    try{
      if(window.state && window.state.medals && Object.prototype.hasOwnProperty.call(window.state.medals, key)){
        return clamp3(window.state.medals[key]);
      }
    }catch(e){}
    try{
      if(typeof state !== 'undefined' && state && state.medals && Object.prototype.hasOwnProperty.call(state.medals, key)){
        return clamp3(state.medals[key]);
      }
    }catch(e){}
    return 0;
  }

  function clearOld(row){
    if(!row) return;
    row.querySelectorAll('.lv-badge.done,.lv-stars,.level-stars,.level-brains,.brain-row,.brains-earned,.brain-row-level,.a-clean-brains-bar,.level-brains-earned,.a-exact-brain-bar,.a-level-brains-bar,.a-level-minds').forEach(function(el){
      if(!el.classList.contains(BAR)) el.remove();
    });
  }

  function makeBar(count){
    var bar = document.createElement('div');
    bar.className = BAR + ' a-level-minds';
    bar.dataset.brains = String(count);
    bar.setAttribute('aria-label', count + ' cerebro' + (count === 1 ? '' : 's') + ' conseguido' + (count === 1 ? '' : 's'));
    for(var i=0;i<count;i++){
      var brain = document.createElement('span');
      brain.className = BRAIN;
      brain.textContent = '🧠';
      bar.appendChild(brain);
    }
    return bar;
  }

  function paintRow(row, level){
    if(!row || !level) return;
    var count = medalFor(level);
    clearOld(row);
    row.classList.toggle('has-visible-brains', count > 0);
    row.classList.toggle('gold-mastered', count === 3);
    row.classList.toggle('a-three-brains', count === 3);
    row.classList.toggle('a-partial-brains', count > 0 && count < 3);
    row.querySelectorAll('.' + BAR).forEach(function(el){ el.remove(); });
    if(count > 0) row.appendChild(makeBar(count));
  }

  function refreshLevelBrains(){
    var map = document.getElementById('screen-map');
    var W = worlds();
    if(!map || !W.length) return;
    var blocks = Array.prototype.slice.call(map.querySelectorAll('.world-block'));
    W.forEach(function(world, wi){
      var block = blocks[wi];
      if(!block) return;
      var rows = Array.prototype.slice.call(block.querySelectorAll('.world-levels .level-row'));
      (world.levels || []).forEach(function(level, li){
        paintRow(rows[li], level);
      });
    });
  }

  var scheduled = false;
  function scheduleRefresh(){
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(function(){
      scheduled = false;
      refreshLevelBrains();
    });
  }

  ['renderMap','goToMap','continueFromComplete','finishLevel','saveState','saveProgress','loadState','loadProgress','show'].forEach(function(name){
    try{
      var fn = window[name];
      if(typeof fn === 'function' && !fn[PATCHED]){
        window[name] = function(){
          var result = fn.apply(this, arguments);
          scheduleRefresh();
          setTimeout(scheduleRefresh, 80);
          setTimeout(scheduleRefresh, 250);
          return result;
        };
        window[name][PATCHED] = true;
      }
    }catch(e){}
  });

  function boot(){
    scheduleRefresh();
    setTimeout(scheduleRefresh, 120);
    setTimeout(scheduleRefresh, 650);
  }

  try{
    var map = document.getElementById('screen-map');
    if(map){
      new MutationObserver(function(){ scheduleRefresh(); }).observe(map, {childList:true, subtree:true});
    }
  }catch(e){}

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.refreshLevelBrains = refreshLevelBrains;
  window.aRefreshTopbarAndLevelMinds = refreshLevelBrains;
})();

;

/* === ander-hint-sound-short-personal-feedback-js === */

;

(function(){
  'use strict';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function strip(v){return String(v==null?'':v).replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();}
  function getQ(){try{if(typeof currentLevel!=='undefined'&&currentLevel&&currentLevel.qs&&typeof currentQIndex!=='undefined')return currentLevel.qs[currentQIndex];}catch(e){} return null;}
  function indexes(q){var a=[]; if(!q)return a; if(Array.isArray(q.validAns))a=q.validAns.slice(); else if(Array.isArray(q.corrects))a=q.corrects.slice(); else if(Array.isArray(q.accept))a=q.accept.slice(); else if(Number.isFinite(Number(q.ans)))a=[Number(q.ans)]; return a.map(Number).filter(function(n){return Number.isFinite(n);});}
  function ans(q){var ids=indexes(q); if(q&&Array.isArray(q.opts)&&ids.length&&q.opts[ids[0]]!=null)return strip(q.opts[ids[0]]); if(q&&q.blank)return strip(String(q.blank).split('/')[0]); return '';}
  function chosen(q,i){return q&&Array.isArray(q.opts)&&q.opts[Number(i)]!=null?strip(q.opts[Number(i)]):'';}
  function low(v){return strip(v).toLowerCase();}
  function firstUsefulSentence(txt){
    txt=strip(txt).replace(/^recuerda:\s*/i,'').replace(/^mira:\s*/i,'');
    var parts=txt.split(/(?<=[.!?])\s+/).filter(Boolean);
    txt=(parts[0]||txt).trim();
    return txt.length>105?txt.slice(0,102).replace(/\s+\S*$/,'')+'…':txt;
  }
  function personalizedLine(q,i,ok){
    var a=ans(q), c=chosen(q,i), en=strip(q&&q.en), es=strip(q&&q.es), tip=firstUsefulSentence(q&&q.tip);
    var text=low((q&&q.name)+' '+(q&&q.sub)+' '+en+' '+es+' '+a);
    if(tip && !/^la palabra correcta comienza/i.test(tip)){
      return ok ? tip : tip+' Correcta: “'+a+'”.';
    }
    if(/\bam\b|\bis\b|\bare\b|to be|soy|eres|está|son/.test(text)) return ok?'“'+a+'” encaja con el sujeto de esta oración.':'Aquí va “'+a+'”, no “'+c+'”, porque el sujeto pide esa forma.';
    if(/\ba\b|\ban\b|\bthe\b|artículo|un |una /.test(text)) return ok?'“'+a+'” suena natural con la palabra que sigue.':'La frase pide “'+a+'”; el artículo depende del sonido y del contexto.';
    if(/my|your|his|her|our|their|mi |tu |su |nuestro/.test(text)) return ok?'“'+a+'” marca bien de quién es algo.':'Aquí la posesión correcta la marca “'+a+'”, no “'+c+'”.';
    if(/never|always|sometimes|usually|nunca|siempre|veces|normalmente/.test(text)) return ok?'“'+a+'” conserva la frecuencia exacta de la idea.':'La frecuencia correcta es “'+a+'”; “'+c+'” cambia el sentido.';
    if(/plural|two|three|dos|tres|cats|children|feet|buses|watches/.test(text)) return ok?'“'+a+'” es el plural que pide la cantidad.':'Con esa cantidad, la forma correcta es “'+a+'”.';
    if(/ing|continuous|estoy|está|estamos|haciendo|comiendo/.test(text)) return ok?'“'+a+'” completa la acción en progreso.':'La acción en progreso necesita “'+a+'”.';
    return ok?'“'+a+'” completa esta frase con sentido natural.':'La opción que completa mejor la frase es “'+a+'”.';
  }
  function feedbackHTML(q,i,ok){
    return '<div class="xp-fb-title">'+(ok?'✅ Correcto':'🟡 Casi')+'</div><p class="xp-fb-reason">'+esc(personalizedLine(q,i,ok))+'</p>';
  }
  function playHintButtonSound(){
    try{
      var C=window.AudioContext||window.webkitAudioContext; if(!C)return;
      var ctx=new C(), now=ctx.currentTime;
      [[740,.055,.11,0],[988,.07,.09,.055],[1318,.09,.07,.115]].forEach(function(n){
        var o=ctx.createOscillator(), g=ctx.createGain();
        o.type='triangle'; o.frequency.setValueAtTime(n[0],now+n[3]);
        o.frequency.exponentialRampToValueAtTime(n[0]*1.08,now+n[3]+n[1]);
        g.gain.setValueAtTime(0.0001,now+n[3]);
        g.gain.linearRampToValueAtTime(n[2],now+n[3]+0.012);
        g.gain.exponentialRampToValueAtTime(0.0001,now+n[3]+n[1]+0.04);
        o.connect(g); g.connect(ctx.destination); o.start(now+n[3]); o.stop(now+n[3]+n[1]+0.055);
      });
    }catch(e){}
  }
  document.addEventListener('pointerdown',function(ev){
    var h=ev.target&&ev.target.closest&&ev.target.closest('#btn-hint');
    if(!h||h.disabled)return;
    try{if(typeof answered!=='undefined'&&answered)return;}catch(e){}
    playHintButtonSound();
  },true);
  var prevSelect=window.selectAns;
  window.selectAns=function(i){
    var q=getQ(), valid=indexes(q), ok=valid.indexOf(Number(i))!==-1;
    if(typeof prevSelect==='function') prevSelect.apply(this,arguments);
    setTimeout(function(){
      var fb=document.getElementById('q-fb');
      if(fb&&q&&fb.classList.contains('show')){
        fb.className='fb-box '+(ok?'ok':'ko')+' show';
        fb.innerHTML=feedbackHTML(q,i,ok);
      }
    },0);
  };
})();

;

/* === xp-emotional-feedback-and-popups-v1-js === */

;

(function(){
  const ready = (fn) => {
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  };

  ready(function(){
    let popupTimer = null;

    function ensurePopupLayer(){
      let layer = document.getElementById('xp-level-popup-layer');
      if(!layer){
        layer = document.createElement('div');
        layer.id = 'xp-level-popup-layer';
        document.body.appendChild(layer);
      }
      return layer;
    }

    window.xpLevelPopup = function(message, type){
      const layer = ensurePopupLayer();
      layer.innerHTML = '';
      const pop = document.createElement('div');
      pop.className = 'xp-level-popup ' + (type || 'good');
      const emoji = type === 'care' ? '🌱' : '✨';
      pop.innerHTML = '<span class="xp-pop-emoji">'+emoji+'</span><span class="xp-pop-text">'+message+'</span>';
      layer.appendChild(pop);

      clearTimeout(popupTimer);
      popupTimer = setTimeout(function(){
        pop.classList.add('out');
        setTimeout(function(){
          if(layer.contains(pop)) layer.removeChild(pop);
        }, 260);
      }, 1600);
    };

    function stripHtml(text){
      return String(text || '')
        .replace(/<br\s*\/?>/gi,' ')
        .replace(/<[^>]+>/g,' ')
        .replace(/\s+/g,' ')
        .trim();
    }

    function makeHumanFeedback(q, correct){
      const answer = q && Array.isArray(q.opts) ? q.opts[q.ans] : (q && q.blank) || '';
      const rawTip = stripHtml(q && q.tip);
      const spanish = stripHtml(q && q.es);
      const english = stripHtml(q && q.en).replace(/___/g, answer || '');

      const levelObj = (typeof currentLevel !== 'undefined' && currentLevel) ? currentLevel : {};
      const levelName = (levelObj.name || levelObj.title || levelObj.topic || '').toString().toLowerCase();
      const levelSub = (levelObj.sub || levelObj.desc || levelObj.subtitle || '').toString().toLowerCase();
      const topicText = (levelName + ' ' + levelSub).toLowerCase();

      let head = correct ? 'Nicee, eso encaja' : 'Casi, mira el patrón';
      let emoji = correct ? '🐣' : '🌱';
      let pattern = '';
      let reason = '';
      let micro = '';
      let example = english || '';

      function hasAny(text, arr){
        return arr.some(k => text.includes(k));
      }

      function setFeedback(okHead, koHead, okReason, koReason, patt, ex, extra){
        head = correct ? okHead : koHead;
        pattern = patt || '';
        reason = correct ? okReason : koReason;
        micro = extra || '';
        example = ex || english || '';
      }

      // Feedback por TEMA DEL NIVEL, no por palabras sueltas.
      // Esto evita errores como detectar “She” y responder con Verb To Be cuando el nivel es Pronombres/Sujetos.

      if(hasAny(topicText, ['pronombre','pronoun','subject','sujeto','i, you','he, she'])){
        setFeedback(
          'Bien, sujeto correcto ✨',
          'Casi, revisa quién actúa 🌱',
          'Elegiste el pronombre que representa a la persona de la frase. Aquí importa quién hace la acción, no el verbo.',
          'La pista está en “mi mamá”: hablamos de una mujer, entonces el sujeto natural es “She”.',
          'Patrón: persona o cosa → pronombre sujeto → acción.',
          'My mom works a lot → She works a lot',
          'He = él · She = ella · They = ellos/ellas.'
        );
      }

      else if(hasAny(topicText, ['verb to be','to be','am / is / are','am/is/are'])){
        setFeedback(
          'Bien, forma correcta 💙',
          'Casi, mira la persona 🌱',
          'Usaste la forma correcta de “to be” según el sujeto de la frase.',
          'El verbo cambia según quién aparece antes: no todos usan la misma forma.',
          'Patrón: I → am · he/she/it → is · you/we/they → are.',
          'She is ready · They are friends',
          'Primero identifica el sujeto; después eliges am, is o are.'
        );
      }

      else if(hasAny(topicText, ['artículo','articulos','artículos','article','a / an','a/an','the'])){
        setFeedback(
          'Bien, artículo natural ✨',
          'Casi, escucha el inicio 🌱',
          'El artículo queda bien porque combina con el sonido de la palabra que viene después.',
          'La clave no es solo la letra: es el sonido con el que empieza la siguiente palabra.',
          'Patrón: a + sonido consonante · an + sonido vocal · the + algo específico.',
          'a dog · an apple · the moon',
          '“an hour” usa an porque suena como vocal.'
        );
      }

      else if(hasAny(topicText, ['plural','singular'])){
        setFeedback(
          'Bien, número correcto ✨',
          'Casi, cuenta la idea 🌱',
          'La palabra mantiene coherencia con si hablamos de una sola cosa o de varias.',
          'Mira si la frase habla de uno o más de uno; eso cambia la forma de la palabra.',
          'Patrón: one + singular · two/many + plural.',
          'one cat · two cats · many boxes',
          'En muchos plurales agregas -s; si termina parecido a s/ch/sh/x, suele ser -es.'
        );
      }

      else if(hasAny(topicText, ['present continuous','continuous','estar + -ing','-ing'])){
        setFeedback(
          'Bien, acción en progreso ✨',
          'Casi, piensa en “está pasando” 🌱',
          'La frase habla de algo que ocurre ahora o alrededor de este momento.',
          'Cuando la acción está en proceso, el inglés necesita be + verbo con -ing.',
          'Patrón: am/is/are + verbo-ing.',
          'She is studying · We are learning',
          'No basta con el verbo en -ing; también necesitas am/is/are.'
        );
      }

      else if(hasAny(topicText, ['negative','negatives','negaciones','negativo','isn’t','aren’t','not'])){
        setFeedback(
          'Bien, negación clara ✨',
          'Casi, ubica el “not” 🌱',
          'La negación está bien puesta y la frase conserva sentido completo.',
          'En inglés la negación suele ir después del auxiliar o del verbo to be.',
          'Patrón: sujeto + am/is/are + not · do/does + not + verbo base.',
          'She is not tired · They don’t work',
          '“doesn’t” ya lleva la -s; el verbo queda base: doesn’t work.'
        );
      }

      else if(hasAny(topicText, ['question','questions','pregunta','preguntas','am / is / are questions'])){
        setFeedback(
          'Bien, pregunta natural ✨',
          'Casi, cambia el orden 🌱',
          'La pregunta queda bien porque respeta el orden natural del inglés.',
          'En preguntas no siempre traducimos palabra por palabra; el orden manda.',
          'Patrón con to be: am/is/are + sujeto + complemento?',
          'Are you ready? · Is she here?',
          'Si es pregunta con do/does: Do you...? Does she...?'
        );
      }

      else if(hasAny(topicText, ['present simple','rutina','routine','daily','daily english'])){
        setFeedback(
          'Bien, rutina clara ✨',
          'Casi, mira el hábito 🌱',
          'La frase suena natural para hablar de hábitos, rutinas o cosas que pasan seguido.',
          'Si el sujeto es he/she/it, normalmente el verbo cambia con -s o -es.',
          'Patrón: I/you/we/they + verbo base · he/she/it + verbo con -s.',
          'She works a lot · They study every day',
          'En preguntas con does, el verbo vuelve a base: Does she work?'
        );
      }

      else if(hasAny(topicText, ['possessive','posesivo','my / your','my your','his her','our their'])){
        setFeedback(
          'Bien, posesivo correcto ✨',
          'Casi, mira de quién es 🌱',
          'Elegiste el posesivo que corresponde a la persona dueña de algo.',
          'La pregunta no es “quién hace”, sino “de quién es”.',
          'Patrón: my = mi · your = tu/su · his = de él · her = de ella · their = de ellos.',
          'Her phone · His bag · Their house',
          'No confundas “she” con “her”: she hace la acción; her muestra pertenencia.'
        );
      }

      else if(hasAny(topicText, ['preposition','preposición','preposiciones','in / on / at','in on at'])){
        setFeedback(
          'Bien, ubicación natural ✨',
          'Casi, mira lugar/tiempo 🌱',
          'La preposición encaja con el tipo de lugar, fecha u hora de la frase.',
          'In, on y at no se usan igual; cada una marca una relación diferente.',
          'Patrón: at + hora/punto · on + día/superficie · in + lugar amplio/mes/año.',
          'at 7 · on Monday · in Colombia',
          'Piensa en qué tan específico es el punto que estás mencionando.'
        );
      }

      else if(hasAny(topicText, ['there is','there are','hay'])){
        setFeedback(
          'Bien, “hay” correcto ✨',
          'Casi, cuenta cuántos hay 🌱',
          'Usaste la forma correcta para decir que algo existe o está en un lugar.',
          'La diferencia depende de si hablas de una cosa o de varias.',
          'Patrón: there is + singular · there are + plural.',
          'There is a book · There are two books',
          'Si puedes contar varias cosas, normalmente va “there are”.'
        );
      }

      else if(hasAny(topicText, ['can','could','ability','habilidad','poder'])){
        setFeedback(
          'Bien, habilidad clara ✨',
          'Casi, verbo base después del modal 🌱',
          'La frase funciona porque después del modal el verbo queda en forma base.',
          'Can/could no necesitan “to” ni cambian el verbo con -s.',
          'Patrón: sujeto + can/could + verbo base.',
          'She can swim · They could help',
          'No digas “she can swims”; después de can va “swim”.'
        );
      }

      else if(hasAny(topicText, ['past','pasado','simple past','was','were','did'])){
        setFeedback(
          'Bien, pasado coherente ✨',
          'Casi, ubica el pasado 🌱',
          'La frase marca una acción o estado que ya ocurrió.',
          'En pasado debes decidir si necesitas was/were, did o un verbo en pasado.',
          'Patrón: was/were para estados · did para preguntas/negaciones · verbo pasado para acciones.',
          'She was tired · They played · Did you go?',
          'Con did, el verbo vuelve a base: Did you play?'
        );
      }

      else if(hasAny(topicText, ['future','futuro','going to','will'])){
        setFeedback(
          'Bien, futuro natural ✨',
          'Casi, apunta hacia después 🌱',
          'La frase habla de algo que pasará o que alguien planea hacer.',
          'Para futuro puedes usar will o be going to según la intención.',
          'Patrón: will + verbo base · am/is/are going to + verbo base.',
          'I will study · She is going to travel',
          'Después de will no agregas -s: she will go.'
        );
      }

      else if(hasAny(topicText, ['comparative','comparativo','superlative','superlativo','better','best','more'])){
        setFeedback(
          'Bien, comparación clara ✨',
          'Casi, revisa qué comparas 🌱',
          'La frase compara personas, cosas o niveles de una forma natural.',
          'Los adjetivos cortos suelen usar -er; los largos suelen usar more.',
          'Patrón: adjective-er than · more + adjective than · the most.',
          'bigger than · more interesting than · the best',
          'No mezcles “more” con -er: no “more bigger”.'
        );
      }

      else if(hasAny(topicText, ['food','comida','restaurant','restaurante'])){
        setFeedback(
          'Bien, frase útil 🍽️',
          'Casi, piensa en la situación 🌱',
          'La opción suena natural para pedir, ofrecer o hablar de comida.',
          'En restaurantes, el inglés suele ser directo pero amable.',
          'Patrón útil: I’d like... · Can I have...? · Do you have...?',
          'Can I have the menu? · I’d like water',
          'Busca la frase que una persona diría de verdad.'
        );
      }

      else if(hasAny(topicText, ['travel','viaje','airport','hotel'])){
        setFeedback(
          'Bien, viaje real ✈️',
          'Casi, piensa en resolver algo 🌱',
          'La frase ayuda a comunicar una necesidad real durante un viaje.',
          'En viajes conviene usar frases claras, cortas y directas.',
          'Patrón útil: Where is...? · I need... · How much is...?',
          'Where is the hotel? · I need a ticket',
          'La mejor respuesta suele ser la que te ayuda a avanzar en la situación.'
        );
      }

      else if(hasAny(topicText, ['work','job','trabajo','interview','entrevista'])){
        setFeedback(
          'Bien, suena profesional 💼',
          'Casi, hazlo más claro 🌱',
          'La opción comunica la idea de forma clara y adecuada para trabajo.',
          'En contexto laboral, importa sonar directo, respetuoso y específico.',
          'Patrón útil: I can... · I have experience... · I’m good at...',
          'I can help with this · I have experience',
          'Evita frases confusas; prioriza claridad.'
        );
      }

      else {
        reason = rawTip || (correct
          ? 'La opción encaja con el sentido completo de la frase.'
          : 'Lee la frase completa y busca la opción que suene más natural.');
        pattern = 'Patrón: conecta sujeto, acción y contexto antes de elegir.';
        micro = 'No memorices la respuesta: entiende por qué funciona.';
        example = english || '';
      }

      return '<div class="xp-fb-head"><span class="xp-fb-emoji">'+emoji+'</span><span>'+head+'</span></div>'
        + '<div class="xp-fb-body">'
        + (pattern ? '<strong>Patrón:</strong> '+pattern+'<br>' : '')
        + '<strong>Razón:</strong> '+reason
        + (micro ? '<br><span class="xp-fb-soft">'+micro+'</span>' : '')
        + '</div>'
        + (example ? '<div class="xp-fb-example"><span class="xp-fb-soft">Ejemplo:</span> '+example+'</div>' : '');
    }

    function enhanceFeedbackAfterAnswer(idx){
      setTimeout(function(){
        try{
          if(typeof currentLevel === 'undefined' || typeof currentQIndex === 'undefined') return;
          const q = currentLevel && currentLevel.qs ? currentLevel.qs[currentQIndex] : null;
          const fb = document.getElementById('q-fb');
          if(!q || !fb) return;

          const correct = Number(idx) === Number(q.ans);
          fb.innerHTML = makeHumanFeedback(q, correct);

          const correctStreak = typeof sessionCorrectStreak !== 'undefined' ? Number(sessionCorrectStreak || 0) : 0;
          const wrongStreak = typeof sessionWrongStreak !== 'undefined' ? Number(sessionWrongStreak || 0) : 0;

          if(correct && correctStreak >= 2 && correctStreak <= 10){
            const goodMessages = {
              2:'Racha x2 🔥 vas cogiendo ritmo',
              3:'Tres seguidas ✨ ese patrón ya está entrando',
              4:'Racha x4 🚀 muy sólido',
              5:'Cinco seguidas 🐣 esto ya se siente fluido',
              6:'Racha x6 💙 estás construyendo confianza',
              7:'Siete seguidas ⚡ tu cerebro está conectando',
              8:'Racha x8 🌟 nivel serio',
              9:'Nueve seguidas 🏆 casi impecable',
              10:'Racha x10 🔥✨🎉 brutal, estás volando'
            };
            window.xpLevelPopup(goodMessages[correctStreak] || 'Buena racha ✨', 'good');
          }

          if(!correct && wrongStreak >= 2){
            const careMessages = {
              2:'Respira 🌱 mira el patrón con calma',
              3:'Tranqui 💙 el error también enseña',
              4:'Pausa breve 🫶 vuelve a la frase completa',
              5:'No es caída, es mapa 🌱 sigue'
            };
            window.xpLevelPopup(careMessages[Math.min(wrongStreak,5)] || 'Sigue, una por una 🌱', 'care');
          }
        }catch(e){}
      }, 0);
    }

    const installSelectPatch = () => {
      if(typeof window.selectAns !== 'function' || window.selectAns.__xpEmotionalPatched) return false;
      const original = window.selectAns;
      window.selectAns = function(idx){
        const result = original.apply(this, arguments);
        enhanceFeedbackAfterAnswer(idx);
        return result;
      };
      window.selectAns.__xpEmotionalPatched = true;
      return true;
    };

    if(!installSelectPatch()){
      const t = setInterval(function(){
        if(installSelectPatch()) clearInterval(t);
      }, 120);
      setTimeout(function(){ clearInterval(t); }, 8000);
    }

    if(typeof window.showPhilosophy === 'function' && !window.showPhilosophy.__xpSoftPatched){
      const oldShow = window.showPhilosophy;
      window.showPhilosophy = function(kind){
        try{
          const quizActive = document.getElementById('screen-quiz')?.classList.contains('active');
          if(quizActive){
            const map = {
              correct3:'Tres seguidas ✨ vas muy bien',
              correct5:'Cinco seguidas 🔥 esa confianza se nota',
              wrong2:'Respira 🌱 revisa el patrón',
              wrong5:'Tranqui 💙 vuelve a una frase a la vez',
              recuperación:'Buena recuperación 🫶 eso también es progreso',
              level:'Nivel completado ✨'
            };
            if(map[kind]) window.xpLevelPopup(map[kind], String(kind).includes('wrong') ? 'care' : 'good');
            return;
          }
        }catch(e){}
        return oldShow.apply(this, arguments);
      };
      window.showPhilosophy.__xpSoftPatched = true;
    }
  });
})();

;

/* === xp-selected-answer-memory-fix === */

;

(function(){
  const install = () => {
    if(typeof window.selectAns !== 'function' || window.selectAns.__xpRememberPicked) return false;
    const original = window.selectAns;
    window.selectAns = function(idx){
      try{
        const q = (typeof currentLevel !== 'undefined' && typeof currentQIndex !== 'undefined' && currentLevel && currentLevel.qs) ? currentLevel.qs[currentQIndex] : null;
        window.lastPickedAnswer = q && Array.isArray(q.opts) ? q.opts[idx] : '';
      }catch(e){}
      return original.apply(this, arguments);
    };
    window.selectAns.__xpRememberPicked = true;
    return true;
  };
  if(!install()){
    const t = setInterval(function(){ if(install()) clearInterval(t); }, 100);
    setTimeout(function(){ clearInterval(t); }, 5000);
  }
})();

;

/* === ander-final-feedback-brains-patch-js === */

;

(function(){
  'use strict';
  const clean = v => String(v == null ? '' : v).replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
  const esc = v => clean(v).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const low = v => clean(v).toLowerCase();
  function rightAnswer(q){
    if(!q) return '';
    if(Array.isArray(q.opts) && q.opts[q.ans] != null) return clean(q.opts[q.ans]);
    return clean(q.blank || q.answer || q.correct || '');
  }
  function pickedAnswer(q, idx){
    return q && Array.isArray(q.opts) && q.opts[idx] != null ? clean(q.opts[idx]) : '';
  }
  function exampleFor(q, answer){
    const en = clean(q && q.en);
    if(en && /___/.test(en)) return en.replace('___', answer);
    return '';
  }
  function reasonFor(q, idx, correct){
    const answer = rightAnswer(q);
    const picked = pickedAnswer(q, idx);
    const text = low([q&&q.name,q&&q.sub,q&&q.es,q&&q.en,answer].join(' '));
    const en = clean(q&&q.en);
    const es = clean(q&&q.es);
    const ex = exampleFor(q, answer);
    let why = '';
    if(/\b(a|an|the)\b|artículo|sky|apple|cat|ice cream|president|moon|sun/.test(text)){
      if(/^the$/i.test(answer)) why = `“${answer}” va bien porque hablamos de algo específico o conocido${/sky|cielo/.test(text)?', como el cielo':''}.`;
      else if(/^an$/i.test(answer)) why = `“${answer}” va bien porque la siguiente palabra empieza con sonido de vocal.`;
      else why = `“${answer}” va bien porque la siguiente palabra empieza con sonido de consonante.`;
    } else if(/to be|am|is|are|soy|eres|está|son/.test(text)){
      why = `“${answer}” encaja con el sujeto de la oración.`;
    } else if(/pronombre|\bi\b|\byou\b|\bhe\b|\bshe\b|\bit\b|\bwe\b|\bthey\b|mamá|papá|juan|pedro|gato/.test(text)){
      why = `“${answer}” reemplaza correctamente a la persona o cosa de la frase.`;
    } else if(/plural|two|three|dos|tres|cats|buses|children|feet|watches/.test(text)){
      why = `“${answer}” es la forma plural que pide la cantidad.`;
    } else if(/ing|continuous|comiendo|corriendo|hablando|haciendo|durmiendo/.test(text)){
      why = `“${answer}” muestra una acción que está pasando ahora.`;
    } else if(/my|your|his|her|our|their|posesivo|mi |tu |su /.test(text)){
      why = `“${answer}” muestra de quién es algo en la frase.`;
    } else if(/never|always|usually|sometimes|nunca|siempre|normalmente|frecuencia/.test(text)){
      why = `“${answer}” conserva la frecuencia exacta de la idea.`;
    } else if(/past|pasado|was|were|did|played|went/.test(text)){
      why = `“${answer}” marca mejor que la acción o estado ya pasó.`;
    } else if(/future|futuro|will|going to/.test(text)){
      why = `“${answer}” apunta naturalmente a algo que pasará después.`;
    } else if(/comparative|superlative|more|better|best|than|comparativo|superlativo/.test(text)){
      why = `“${answer}” compara la idea de forma natural en inglés.`;
    } else {
      why = `“${answer}” completa la frase de forma natural.`;
    }
    if(!correct && picked) why = `Era “${answer}”, no “${picked}”. ` + why;
    const context = ex ? ` ${ex}` : (en ? ` ${en.replace('___', answer)}` : '');
    return why + (context ? `<br><span class="xp-fb-soft">${esc(context)}</span>` : '');
  }
  function shortFeedbackHTML(q, idx, correct){
    const emoji = correct ? '🐣' : '🌱';
    const title = correct ? 'Bien, así suena natural ✨' : 'Casi, mira el detalle';
    return '<div class="xp-fb-head"><span class="xp-fb-emoji">'+emoji+'</span><span>'+title+'</span></div>'+
           '<div class="xp-fb-body">'+reasonFor(q, idx, correct)+'</div>';
  }
  function currentQuestion(){
    try{ return (typeof currentLevel !== 'undefined' && typeof currentQIndex !== 'undefined' && currentLevel && currentLevel.qs) ? currentLevel.qs[currentQIndex] : null; }catch(e){ return null; }
  }
  function installFeedbackPatch(){
    if(typeof window.selectAns !== 'function' || window.selectAns.__anderShortFeedback) return;
    const original = window.selectAns;
    window.selectAns = function(idx){
      const q = currentQuestion();
      const correct = q ? Number(idx) === Number(q.ans) : false;
      const result = original.apply(this, arguments);
      setTimeout(function(){
        const fb = document.getElementById('q-fb');
        if(fb && q && fb.classList.contains('show')){
          fb.className = 'fb-box '+(correct?'ok':'ko')+' show';
          fb.innerHTML = shortFeedbackHTML(q, idx, correct);
        }
      }, 25);
      return result;
    };
    window.selectAns.__anderShortFeedback = true;
  }
  function applyBrainBars(){
    try{
      const worlds = (typeof WORLDS !== 'undefined') ? WORLDS : window.WORLDS;
      if(!worlds) return;
      const rows = Array.from(document.querySelectorAll('#screen-map .world-block:not(.locked-world) .level-row'));
      let n = 0;
      worlds.forEach(function(world){
        if(!world || !Array.isArray(world.levels)) return;
        // Solo cuenta mundos ya renderizados/desbloqueados: toma las filas existentes en orden.
        world.levels.forEach(function(level){
          const row = rows[n++];
          if(!row) return;
          row.querySelectorAll('.a-exact-brain-bar').forEach(el => el.remove());
          let medal = 0;
          try{ medal = (typeof getMedal === 'function') ? Number(getMedal(level)||0) : 0; }catch(e){ medal = 0; }
          medal = Math.max(0, Math.min(3, medal));
          if(medal <= 0) return;
          const bar = document.createElement('div');
          bar.className = 'a-exact-brain-bar';
          bar.setAttribute('aria-label', medal + ' cerebros ganados');
          bar.innerHTML = Array.from({length:medal}, () => '<span class="a-world-brain-earned">🧠</span>').join('');
          row.appendChild(bar);
          if(medal === 3) row.classList.add('a-three-brains');
          else row.classList.add('a-partial-brains');
        });
      });
    }catch(e){}
  }
  function installMapPatch(){
    if(typeof window.renderMap === 'function' && !window.renderMap.__anderBrainBars){
      const original = window.renderMap;
      window.renderMap = function(){
        const result = original.apply(this, arguments);
        setTimeout(applyBrainBars, 0);
        return result;
      };
      window.renderMap.__anderBrainBars = true;
    }
    setTimeout(applyBrainBars, 60);
  }
  function boot(){ installFeedbackPatch(); installMapPatch(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  const t = setInterval(function(){ installFeedbackPatch(); installMapPatch(); }, 250);
  setTimeout(function(){ clearInterval(t); }, 5000);
})();

;

/* === ander-final-feedback-no-resize-js === */

;

(function(){
  'use strict';
  const clean=v=>String(v==null?'':v).replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
  const esc=v=>clean(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const low=v=>clean(v).toLowerCase();
  function qNow(){try{return currentLevel&&currentLevel.qs?currentLevel.qs[currentQIndex]:null;}catch(e){return null;}}
  function ids(q){if(!q)return[];let a=Array.isArray(q.validAns)?q.validAns:(Array.isArray(q.corrects)?q.corrects:[q.ans]);return a.map(Number).filter(Number.isFinite);}
  function ans(q){let a=ids(q);if(q&&Array.isArray(q.opts)&&a.length&&q.opts[a[0]]!=null)return clean(q.opts[a[0]]);return clean(q&& (q.blank||q.answer||q.correct));}
  function picked(q,i){return q&&Array.isArray(q.opts)&&q.opts[Number(i)]!=null?clean(q.opts[Number(i)]):'';}
  function sentence(q,a){let en=clean(q&&q.en);return en&&/___/.test(en)?en.replace('___',a):'';}
  function reason(q,i,ok){
    const a=ans(q), p=picked(q,i), t=low([(q&&q.name),(q&&q.sub),(q&&q.topic),(q&&q.es),(q&&q.en),a].join(' '));
    let why='';
    if(/\b(a|an|the)\b|artículo|cielo|sky|apple|moon|sun|president/.test(t)){
      if(/^the$/i.test(a)) why='“'+a+'” va porque hablas de algo específico o conocido'+(/cielo|sky/.test(t)?', como el cielo':'')+'.';
      else if(/^an$/i.test(a)) why='“'+a+'” va porque la siguiente palabra empieza con sonido de vocal.';
      else why='“'+a+'” va porque la siguiente palabra empieza con sonido de consonante.';
    }else if(/to be|\bam\b|\bis\b|\bare\b|was|were|soy|eres|está|son/.test(t)) why='“'+a+'” encaja con el sujeto de la oración.';
    else if(/never|always|usually|sometimes|nunca|siempre|normalmente|frecuencia/.test(t)) why='“'+a+'” conserva exactamente la frecuencia de la idea.';
    else if(/my|your|his|her|our|their|posesivo|mi |tu |su |nuestro/.test(t)) why='“'+a+'” deja claro de quién es algo.';
    else if(/plural|two|three|dos|tres|cats|buses|children|feet|watches/.test(t)) why='“'+a+'” es la forma plural que pide la frase.';
    else why='“'+a+'” completa la oración de forma natural.';
    if(!ok&&p) why='Era “'+a+'”, no “'+p+'”. '+why;
    const ex=sentence(q,a);
    return why+(ex?' <span class="xp-fb-soft">'+esc(ex)+'</span>':'');
  }
  function html(q,i,ok){return '<div class="xp-fb-head"><span class="xp-fb-emoji">'+(ok?'🐣':'🌱')+'</span><span>'+(ok?'Bien, suena natural ✨':'Casi, mira el detalle')+'</span></div><div class="xp-fb-body">'+reason(q,i,ok)+'</div>';}
  function reserveFeedback(){const f=document.getElementById('q-fb');if(f){f.className='fb-box';f.innerHTML='';f.removeAttribute('style');}}
  function renderFeedback(q,i,ok){const f=document.getElementById('q-fb');if(f){f.removeAttribute('style');f.className='fb-box '+(ok?'ok':'ko')+' show';f.innerHTML=html(q,i,ok);}}
  function stableSelect(i){
    try{
      if(typeof answered!=='undefined'&&answered)return;
      const q=qNow(); if(!q)return;
      answered=true;
      const opts=[].slice.call(document.querySelectorAll('#q-opts .opt'));
      const valid=ids(q), ok=valid.indexOf(Number(i))!==-1;
      valid.forEach(v=>{if(opts[v])opts[v].classList.add('correct');});
      if(!ok&&opts[i])opts[i].classList.add('wrong');
      opts.forEach((o,idx)=>{if(valid.indexOf(idx)===-1&&idx!==Number(i))o.classList.add('disabled');});
      const blank=document.getElementById('blank-span'); if(blank)blank.textContent=ans(q);
      renderFeedback(q,i,ok);
      const next=document.getElementById('btn-next'); if(next){next.style.display='block';next.className='btn-next show';}
      const hb=document.getElementById('btn-hint'); if(hb)hb.disabled=true;
      const card=document.querySelector('.q-card'); if(card){card.classList.remove('flash-green','flash-red');void card.offsetWidth;card.classList.add(ok?'flash-green':'flash-red');}
      try{
        if(ok){sessionCorrect++;sessionCorrectStreak++;sessionMaxCorrectStreak=Math.max(sessionMaxCorrectStreak,sessionCorrectStreak);sessionWrongStreak=0;if(typeof calculateDynamicGain==='function')calculateDynamicGain(true,opts[valid[0]]||null);if(typeof SFX!=='undefined'&&SFX.correct)SFX.correct();}
        else{sessionCorrectStreak=0;sessionWrongStreak++;sessionHadWrong=true;if(typeof addSessionXp==='function')addSessionXp(3+Math.floor(Math.random()*6),'Intento',null);try{let n=typeof getHints==='function'?getHints():((state&&state.hints)||0);if(n<5&&typeof earnHint==='function')earnHint(opts[i]||null);}catch(e){}}
      }catch(e){}
      try{if(typeof refreshStreakBadge==='function')refreshStreakBadge(ok?sessionCorrectStreak:0);}catch(e){}
    }catch(e){console.error('EnglishXP stable feedback:',e);}
  }
  function install(){
    try{window.selectAns=stableSelect;selectAns=stableSelect;}catch(e){window.selectAns=stableSelect;}
    if(typeof window.renderQ==='function'&&!window.renderQ.__anderNoResize){
      const old=window.renderQ;
      window.renderQ=function(){const r=old.apply(this,arguments);setTimeout(reserveFeedback,0);return r;};
      window.renderQ.__anderNoResize=true;
    }
    reserveFeedback();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
  const timer=setInterval(install,300);setTimeout(()=>clearInterval(timer),4500);
})();


/* === English XP final runtime guard === */
(function(){
  function byId(id){ return document.getElementById(id); }
  function safe(fn){ try{ fn(); }catch(e){ console.warn('[EnglishXP final guard]', e); } }
  function countBrains(){
    var total = 0;
    safe(function(){
      if (typeof window.WORLDS !== 'undefined' && window.state && state.medals) {
        WORLDS.forEach(function(w){ (w.levels||[]).forEach(function(l){
          var k = (typeof levelKey === 'function') ? levelKey(l) : l.id;
          total += Number(state.medals[k] || 0);
        }); });
      }
    });
    return total;
  }
  window.englishXPRefreshFinalCounters = function(){
    var b = byId('brain-count-display');
    if (b) b.textContent = String(countBrains());
    var xp = byId('xp-balance-display');
    if (xp && window.state) xp.textContent = String(Number(state.xpBalance||state.totalXp||0));
  };
  document.addEventListener('DOMContentLoaded', function(){
    safe(function(){ window.englishXPRefreshFinalCounters(); });
    setInterval(function(){ safe(function(){ window.englishXPRefreshFinalCounters(); }); }, 1200);
  });
})();
