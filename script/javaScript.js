
    document.addEventListener('DOMContentLoaded', function () {
        // Elementos de los pasos
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const stepResult = document.getElementById('step-result');
        const nextStep1Btn = document.getElementById('next-step-1');
        const nextStep2Btn = document.getElementById('next-step-2');
        const restartBtn = document.getElementById('restart');
        const resultElement = document.getElementById('timer-container');
        const expiredElement = document.getElementById('timer-expired');
        const discountCodeContainer = document.getElementById('discount-code-container');
        const discountCodeElement = document.getElementById('discount-code');
        const timerElement = document.getElementById('timer');
        const copyCodeBtn = document.getElementById('copy-code');

    
        // Variables para almacenar la información seleccionada
        let selectedYear = '2016';
        let selectedChoice = 'Segaría a navaja';
    
        // Variables del temporizador
        let timerInterval;
        //const timerDuration = 20 * 60; // 20 minutos en segundos
        const timerDuration = 20; // 20 segundos para ver "codigo caducado"
    
        // Evento para el paso 1
        nextStep1Btn.addEventListener('click', function () {
            // Guardar el año seleccionado
            selectedYear = document.querySelector('input[name="year"]:checked').value;
            
            // Ir al siguiente paso
            step1.classList.remove('active');
            step2.classList.add('active');
        });
    
        // Evento para el paso 2
        nextStep2Btn.addEventListener('click', function () {
            // Guardar la opción seleccionada
            selectedChoice = document.querySelector('input[name="choice"]:checked').value;
    
            // Generar el código de descuento
            const discountCode = generateDiscountCode(selectedYear, selectedChoice);
            discountCodeElement.textContent = discountCode;
    
            // Mostrar el resultado
            step2.classList.remove('active');
            stepResult.classList.add('active');
    
            // Iniciar temporizador
            startTimer(timerDuration);
        });
    
        // Reiniciar formulario
        restartBtn.addEventListener('click', function () {
            clearInterval(timerInterval);
            timerElement.textContent = '20:00';
            stepResult.classList.remove('active');
            step1.classList.add('active');
            if (resultElement) resultElement.style.display = 'flex'; // Muestra timer-container
            if (expiredElement) expiredElement.style.display = 'none'; // Oculta timer-expired
        });
    
        // Copiar código al portapapeles
        copyCodeBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(discountCodeElement.textContent).then(function () {
                alert('¡Código copiado al portapapeles!');
            });
        });
    
        // Función para generar el código de descuento
        function generateDiscountCode(year, choice) {
            const lastTwoDigits = parseInt(year.slice(-2));
            const sumOfDigits = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);
            const sanitizedChoice = choice.slice(-4).toUpperCase().replace(/[^b-zB-Z0-9áéíóúÁÉÍÓÚüÜ]/g, '');
            return `${sumOfDigits}${sanitizedChoice}`;
        }
    
        // Función para iniciar el temporizador
        function startTimer(duration) {
            let timeRemaining = duration;
            updateTimer(timeRemaining);
    
            timerInterval = setInterval(function () {
                timeRemaining--;
                updateTimer(timeRemaining);

                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    if (resultElement) resultElement.style.display = 'none'; // Oculta timer-container
                    if (expiredElement) expiredElement.style.display = 'flex'; // Muestra timer-expired
                }
            }, 1000);
        }
    
        // Función para actualizar el temporizador en el DOM
        function updateTimer(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
    });
    
