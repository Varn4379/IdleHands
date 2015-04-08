window.addEventListener('load', function() {
    var elements = {
        txtMana: document.querySelector("#mana"),
		btnMana: document.querySelector("#meditate"),
        txtSeed: document.querySelector("#seed"),
        btnSeed: document.querySelector("#build-seed"),
        txtFlower: document.querySelector("#flower"),
        btnFlower: document.querySelector("#build-flower"),
		txtVine: document.querySelector("#vine"),
        btnVine: document.querySelector("#build-vine")
    };
    
    var Mana = 0;
    var Seed = {
        count: 0,
        cost: 10,
        mana: 1
    };
    var Flower = {
        count: 0,
        cost: 5,
        mana: 1
    };
	
	var Vine = {
        count: 0,
        cost: 5,
        mana: 1
    };
	
	var save = {
	mana: Mana,
    seed: Seed,
    flower: Flower,
    vine: Vine
	}
    
	var savegame = JSON.parse(localStorage.getItem("save")); 
	
	var saveDelay=0;
	
	var tabLinks = new Array();
    var contentDivs = new Array();
    
    document.querySelector("#meditate").addEventListener('click', function(evt) {
        Mana++;
        updateManaText();
		gameSave();
    });
    
    document.querySelector("#build-seed").addEventListener('click', function(evt) {
        if (Mana < Seed.cost) return;
        
        Seed.count += 1;
        Mana -= Seed.cost;
        Seed.cost = Math.ceil(Seed.cost * 1.25);
        updateSeedText();
        updateManaText();
		gameSave();
    });
    
    document.querySelector("#build-flower").addEventListener('click', function(evt) {
        if (Seed.count < Flower.cost) return;
        
        Flower.count += 1;
        Seed.count -= Flower.cost;
        Flower.cost = Math.ceil(Flower.cost * 1.25);
        updateFlowerText();
        updateSeedText();
		gameSave(); 
    });
	
	document.querySelector("#build-vine").addEventListener('click', function(evt) {
        if (Flower.count < Vine.cost) return;
        
        Vine.count += 1;
        Flower.count -= Vine.cost;
        Vine.cost = Math.ceil(Vine.cost * 1.25);
        updateVineText();
        updateFlowerText();
		gameSave();
    });
	
	document.querySelector("#manual-save").addEventListener('click', function(evt) {
		gameSave();
    });
	
	document.querySelector("#manual-load").addEventListener('click', function(evt) {
		gameLoad();
    });
	
	document.querySelector("#wipe-save").addEventListener('click', function(evt) {
		clearSave();
    });
    
    function updateManaText() {
        elements.txtMana.innerHTML = Mana;
    }
    
    function updateSeedText() {
        elements.txtSeed.innerHTML = Seed.count;
        elements.btnSeed.innerHTML = "Build (" + Seed.cost + ")";
    }
    
    function updateFlowerText() {
        elements.txtFlower.innerHTML = Flower.count;
        elements.btnFlower.innerHTML = "Build (" + Flower.cost + ")";
    }
	
	function updateVineText() {
        elements.txtVine.innerHTML = Vine.count;
        elements.btnVine.innerHTML = "Build (" + Vine.cost + ")";
    }
	
	function gameSave() {
	save.mana = Mana;
    save.seed = JSON.stringify(Seed);
    save.flower = JSON.stringify(Flower);
    save.vine = JSON.stringify(Vine);
	localStorage.setItem("save",JSON.stringify(save)); 
	}
	
	function gameLoad() {
	Mana=0;
	Seed.count=0; Seed.cost=10; Seed.mana=1;
	Flower.count=0; Flower.cost=5; Flower.mana=1;
	Vine.count=0; Vine.cost=5; Vine.mana=1;
	savegame = JSON.parse(localStorage.getItem("save")); 	
	if (typeof savegame.mana !== "undefined") Mana = savegame.mana;	
	if (typeof savegame.seed !== "undefined") Seed = JSON.parse(savegame.seed);
	if (typeof savegame.flower !== "undefined") Flower = JSON.parse(savegame.flower); 
	if (typeof savegame.vine !== "undefined") Vine = JSON.parse(savegame.vine); 
	updateManaText();
	updateSeedText();
	updateFlowerText();
	updateVineText();
	}
	
	function clearSave() {
	Mana=0;
	Seed.count=0; Seed.cost=10; Seed.mana=1;
	Flower.count=0; Flower.cost=5; Flower.mana=1;
	Vine.count=0; Vine.cost=5; Vine.mana=1;
	save.mana = Mana;
    save.seed = Seed;
    save.flower = Flower;
    save.vine = Vine;
	savegame = JSON.parse(localStorage.getItem("save")); 
	updateManaText();
	updateSeedText();
	updateFlowerText();
	updateVineText();
	}
	
	function init() {

      // Grab the tab links and content divs from the page
      var tabListItems = document.getElementById('tabs').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }

      // Assign onclick events to the tab links, and
      // highlight the first tab
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      // Hide all content divs except the first
      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
        i++;
      }
    }
	
	function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }

      // Stop the browser following the link
      return false;
    }
	
	function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }
	
	function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }

    
    function gameLoop() {
        Mana += Math.ceil(Seed.count * Seed.mana);
        Seed.count += Math.ceil(Flower.count * Flower.mana);
		Flower.count += Math.ceil(Vine.count * Vine.mana);
        updateManaText();
		updateSeedText();
		updateFlowerText();
		updateVineText();
		saveDelay++;
		if (saveDelay==60) {saveDelay=0; gameSave();}
		console.log(savegame);
        window.setTimeout(gameLoop, 1000);
    }
	init();
	gameLoad();
    gameLoop();

});