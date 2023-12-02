document.addEventListener('DOMContentLoaded', function() {
	const pages = document.querySelectorAll('.page');
	let currentPage = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	function showPage(index) {
			pages.forEach((page, i) => {
					page.style.display = i === index ? 'block' : 'none';
			});
	}

	function navigate(direction) {
			if (direction === 'next' && currentPage < pages.length - 1) {
					currentPage++;
			} else if (direction === 'prev' && currentPage > 0) {
					currentPage--;
			}

			showPage(currentPage);
	}

	function handleTouchStart(e) {
			touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e) {
			touchEndX = e.changedTouches[0].clientX;
			handleGesture();
	}

	function handleGesture() {
			const swipeDistance = touchEndX - touchStartX;
			if (swipeDistance > 50) {
					navigate('prev'); // deslize para a direita
			} else if (swipeDistance < -50) {
					navigate('next'); // deslize para a esquerda
			}
	}

	// Inicializar exibição da primeira página
	showPage(currentPage);

	// Adicionar navegação por gestos
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchEnd, false);

	// Adicionar navegação por botões
	document.getElementById('next').addEventListener('click', function() {
			navigate('next');
	});

	document.getElementById('prev').addEventListener('click', function() {
			navigate('prev');
	});

	// Adicionar navegação por teclado
	document.addEventListener('keydown', function(e) {
			if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
					navigate('next');
			} else if (e.key === 'ArrowLeft' && currentPage > 0) {
					navigate('prev');
			}
	});
});
