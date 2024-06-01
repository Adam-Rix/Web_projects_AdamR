<body> {
  <section></section>
	<script>
	  const colors = [
	  '#2196f3',
	  '#e91e63',
	  '#ffeb3b',
	  '#2196f3'
	  ]
	
	  function createSquare() {
	    const section = document.querySelector('section');
        const square = document.createElement('span');
        
        var size = Mat.random() * 50;
		
		square.style.width = 20 + size + 'px';
		square.style.height = 20 + size + 'px';
		
		square.style.top = Math.random() * innerHeight + 'px';
		square.style.left = Math.random() * innerWidth + 'px';
		
		const bg = colors [Math.floor(Math.random() length)];
		square.style.background = bg;
		
		selection.appendChild(square);
		
		setTimeout(() =>{
		  square.remove()
		},5000)
		
		setInterval(createSquare , 150)
	  }
	</script>
}</body>