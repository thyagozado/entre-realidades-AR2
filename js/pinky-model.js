// Função para criar o modelo 3D do Pinky usando primitivas do A-Frame
function createPinkyModel() {
    // Container principal
    const container = document.createElement('a-entity');
    container.setAttribute('position', '0 0.4 -3'); // Posição ajustada para centralizar melhor e evitar conflito com a nuvem
    container.setAttribute('rotation', '0 0 0'); // Rotação corrigida para ficar de frente
    container.setAttribute('scale', '0.2 0.2 0.2'); // Escala reduzida para ficar menor
    container.setAttribute('class', 'clickable');
    container.setAttribute('id', 'pinky-entity');
    
    // Corpo principal (rosa)
    const body = document.createElement('a-entity');
    
    // Corpo (forma de fantasma) - Usando esfera para corpo mais arredondado como na referência
    const bodyMain = document.createElement('a-sphere');
    bodyMain.setAttribute('color', '#FF69B4'); // Rosa (Pinky)
    bodyMain.setAttribute('radius', '1');
    bodyMain.setAttribute('position', '0 0 0');
    bodyMain.setAttribute('segments-height', '18');
    bodyMain.setAttribute('segments-width', '36');
    bodyMain.setAttribute('material', 'shader: flat');
    
    // Topo da cabeça (para fechar o topo)
    const top = document.createElement('a-sphere');
    top.setAttribute('color', '#FF69B4');
    top.setAttribute('radius', '1');
    top.setAttribute('position', '0 0 0');
    top.setAttribute('scale', '1 1 1');
    top.setAttribute('material', 'shader: flat');
    
    // Base ondulada do fantasma - mais suave como na referência
    const base1 = document.createElement('a-sphere');
    base1.setAttribute('color', '#FF69B4');
    base1.setAttribute('radius', '0.3');
    base1.setAttribute('position', '-0.6 -0.9 0');
    base1.setAttribute('material', 'shader: flat');
    
    const base2 = document.createElement('a-sphere');
    base2.setAttribute('color', '#FF69B4');
    base2.setAttribute('radius', '0.3');
    base2.setAttribute('position', '-0.2 -1 0');
    base2.setAttribute('material', 'shader: flat');
    
    const base3 = document.createElement('a-sphere');
    base3.setAttribute('color', '#FF69B4');
    base3.setAttribute('radius', '0.3');
    base3.setAttribute('position', '0.2 -1 0');
    base3.setAttribute('material', 'shader: flat');
    
    const base4 = document.createElement('a-sphere');
    base4.setAttribute('color', '#FF69B4');
    base4.setAttribute('radius', '0.3');
    base4.setAttribute('position', '0.6 -0.9 0');
    base4.setAttribute('material', 'shader: flat');
    
    // Olhos (brancos) - Maiores como na referência
    const eyeLeft = document.createElement('a-sphere');
    eyeLeft.setAttribute('color', 'white');
    eyeLeft.setAttribute('radius', '0.3');
    eyeLeft.setAttribute('position', '-0.35 0.2 0.7');
    eyeLeft.setAttribute('material', 'shader: flat');
    eyeLeft.setAttribute('class', 'eye');
    eyeLeft.setAttribute('id', 'eye-left');
    
    const eyeRight = document.createElement('a-sphere');
    eyeRight.setAttribute('color', 'white');
    eyeRight.setAttribute('radius', '0.3');
    eyeRight.setAttribute('position', '0.35 0.2 0.7');
    eyeRight.setAttribute('material', 'shader: flat');
    eyeRight.setAttribute('class', 'eye');
    eyeRight.setAttribute('id', 'eye-right');
    
    // Pupilas (pretas) - Maiores como na referência
    const pupilLeft = document.createElement('a-sphere');
    pupilLeft.setAttribute('color', 'black');
    pupilLeft.setAttribute('radius', '0.18');
    pupilLeft.setAttribute('position', '-0.35 0.2 0.9');
    pupilLeft.setAttribute('material', 'shader: flat');
    pupilLeft.setAttribute('class', 'pupil');
    pupilLeft.setAttribute('id', 'pupil-left');
    
    const pupilRight = document.createElement('a-sphere');
    pupilRight.setAttribute('color', 'black');
    pupilRight.setAttribute('radius', '0.18');
    pupilRight.setAttribute('position', '0.35 0.2 0.9');
    pupilRight.setAttribute('material', 'shader: flat');
    pupilRight.setAttribute('class', 'pupil');
    pupilRight.setAttribute('id', 'pupil-right');
    
    // Reflexo nos olhos (pequenos pontos brancos)
    const reflectionLeft = document.createElement('a-sphere');
    reflectionLeft.setAttribute('color', 'white');
    reflectionLeft.setAttribute('radius', '0.05');
    reflectionLeft.setAttribute('position', '-0.28 0.25 1.05');
    reflectionLeft.setAttribute('material', 'shader: flat');
    
    const reflectionRight = document.createElement('a-sphere');
    reflectionRight.setAttribute('color', 'white');
    reflectionRight.setAttribute('radius', '0.05');
    reflectionRight.setAttribute('position', '0.42 0.25 1.05');
    reflectionRight.setAttribute('material', 'shader: flat');
    
    // Sombra abaixo do Pinky
    const shadow = document.createElement('a-entity');
    shadow.setAttribute('id', 'pinky-shadow');
    
    // Círculo principal da sombra
    const shadowCircle = document.createElement('a-circle');
    shadowCircle.setAttribute('radius', '1.2');
    shadowCircle.setAttribute('rotation', '-90 0 0'); // Rotacionado para ficar no plano horizontal
    shadowCircle.setAttribute('position', '0 0 0');
    shadowCircle.setAttribute('material', 'shader: flat; opacity: 0.3; color: #000000');
    
    // Cauda da sombra (elipse alongada)
    const shadowTail = document.createElement('a-entity');
    shadowTail.setAttribute('geometry', 'primitive: plane; width: 1.5; height: 0.8');
    shadowTail.setAttribute('rotation', '-90 0 0'); // Rotacionado para ficar no plano horizontal
    shadowTail.setAttribute('position', '0 -0.01 -0.8'); // Posicionado logo atrás do círculo principal
    shadowTail.setAttribute('material', 'shader: flat; opacity: 0.2; color: #000000');
    
    // Adicionar elementos da sombra ao container da sombra
    shadow.appendChild(shadowCircle);
    shadow.appendChild(shadowTail);
    
    // Posicionar o container da sombra
    shadow.setAttribute('position', '0 -1.5 0'); // Posicionado abaixo do Pinky
    
    // Animação da sombra - escala diminui quando Pinky sobe (efeito de distância)
    shadow.setAttribute('animation__scale', 'property: scale; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; from: 1 1 1; to: 0.8 0.8 0.8');
    
    // Animação da sombra - opacidade diminui quando Pinky sobe (efeito de distância)
    shadowCircle.setAttribute('animation__opacity', 'property: material.opacity; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; from: 0.3; to: 0.2');
    shadowTail.setAttribute('animation__opacity', 'property: material.opacity; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; from: 0.2; to: 0.1');
    
    // Adicionar todos os componentes ao corpo
    body.appendChild(bodyMain);
    body.appendChild(top);
    body.appendChild(base1);
    body.appendChild(base2);
    body.appendChild(base3);
    body.appendChild(base4);
    body.appendChild(eyeLeft);
    body.appendChild(eyeRight);
    body.appendChild(pupilLeft);
    body.appendChild(pupilRight);
    body.appendChild(reflectionLeft);
    body.appendChild(reflectionRight);
    
    // Adicionar o corpo e a sombra ao container
    container.appendChild(body);
    container.appendChild(shadow);
    
    // Adicionar animação de flutuação contínua - SIMPLES E DIRETA
    container.setAttribute('animation', 'property: position; dir: alternate; dur: 2000; easing: easeInOutSine; loop: true; to: 0 0.6 -3');
    
    return container;
}
