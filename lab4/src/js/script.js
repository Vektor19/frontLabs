import ThemesFileReader from "./ThemesFileReader.js";

const learningPurposeSection = document.querySelector('.description');

let focusTimer;
learningPurposeSection.addEventListener('mouseenter', () => {
    focusTimer = setTimeout(() => {
        createModal();
    }, 3000);
});

learningPurposeSection.addEventListener('mouseleave', () => {
    clearTimeout(focusTimer);
});

function createModal() {
    const focusModal = document.createElement('div');
    focusModal.classList.add('focusModal');
    focusModal.innerHTML = `
        <div class="modal-body">
            <h2>Золоті правила навчання</h2>
            <ul>
                <li>Зберігайте концентрацію</li>
                <li>Практикуйтеся щодня</li>
                <li>Ставте питання</li>
                <li>Експериментуйте</li>
            </ul>
            <button id="closeModal" style="margin-top: 10px;">Закрити</button>
        </div>
    `;

    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modalOverlay');

    modalOverlay.appendChild(focusModal);
    modalOverlay.onclick = (event) => {
        if (event.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    };
    document.body.appendChild(modalOverlay);

    document.getElementById('closeModal').onclick = () => {
        document.body.removeChild(modalOverlay);
    };

}
document.addEventListener('DOMContentLoaded', async() => {
    const themes=await ThemesFileReader.read_themes()
    console.log("All themes: ", themes);

    const themesContainer = document.querySelectorAll('.scientific_themes_container')[0];
    themes.forEach(theme => {
        const themeElement = document.createElement('div');
        themeElement.classList.add('theme_item');
        const themeElementData = document.createElement('div');
        const img = document.createElement('img');
        img.src = theme.imagePath;
        img.alt = theme.title;
        themeElementData.appendChild(img);
        themeElementData.classList.add('theme_item_data');
        themeElementData.innerHTML += `
            <h3>${theme.title}</h3>`;
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');
        infoContainer.style.display = 'none';
        infoContainer.innerHTML = `
            <ul>${theme.lessonNames.map(lesson => `<li>${lesson}</li>`).join('')}</ul>
            <p>Тип завдань: ${theme.taskType.join(', ')}</p>`;
        themeElementData.appendChild(infoContainer);
        const div = document.createElement('div');
        div.classList.add('more_item');
        const p_more = document.createElement('p');
        p_more.innerHTML = '&#8679;';
        p_more.addEventListener('click', (e) => {
            e.target.state = e.target.state === 'up' ? 'down' : 'up';
            const img = themeElement.querySelector('img');
            const h3 = themeElement.querySelector('h3');
            const infoContainer = themeElement.querySelector('.info-container');
            // if (e.target.state === 'up') {
                    

                
            //     h3.style.transform = 'translateY(100%)';
            //     infoContainer.style.transform = 'translateY(100%)';
                
            //     infoContainer.style.transition = 'transform 0.5s ease-in-out';
            //     setTimeout(() => {
                    
            //         infoContainer.style.display = 'flex';
            //         img.style.display = 'none';
            //         h3.style.marginTop = '0';
            //         infoContainer.style.transform = 'translateY(0)';
            //     }, 100);
                
            //     e.target.innerHTML = '&#8681;';
            // } else {
            //     img.style.display = 'flex';
            //     img.style.opacity = '1';
            //     h3.style.marginTop = '0.3em';
            //     //h3.style.transform = 'translateY(0)';
            //     infoContainer.style.display = 'none';

            //     e.target.innerHTML = '&#8679;';
            // }
            
            const currentMarginTop = parseFloat(window.getComputedStyle(h3).marginTop);
            const imgHeight = parseFloat(window.getComputedStyle(img).height);

            // const gap = h3.getBoundingClientRect().top - (img.getBoundingClientRect().top + imgHeight);
            if (e.target.marginH3 === undefined)
                e.target.marginH3 = currentMarginTop + imgHeight;
            if (e.target.state === 'up') {
                
                infoContainer.style.transform = 'translateY(100%)';
                img.style.opacity = '0';
                setTimeout(() => {

                    img.style.display = 'none';
                    h3.style.marginTop = e.target.marginH3 + 'px';
                    setTimeout(() => {
                        h3.style.transition = '0.5s ease-in';
                        infoContainer.style.transition = 'transform 0.5s ease-in-out';
                        h3.style.marginTop = '2em';
                    }, 100);

                    setTimeout(() => {
                        infoContainer.style.display = 'flex';
                        infoContainer.style.transform = 'translateY(0)';
                        infoContainer.style.marginTop = '2em';
                    }, 100);
                    
                }, 200);
                
                
                e.target.innerHTML = '&#8681;';
                
            } else {
                
                h3.style.transform=`translateY(${e.target.marginH3}px)`;
                infoContainer.style.transform = 'translateY(150%)';
                setTimeout(() => {
                    img.style.display = 'block';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 10);
                    h3.style.transition = '';
                    infoContainer.style.transition = '';
                    infoContainer.style.display = 'none';
                    h3.style.marginTop = '1.5em';
                    h3.style.transform = 'translateY(0)';
                }, 500);
                

                e.target.innerHTML = '&#8679;';
            }
        });
        div.appendChild(p_more);
        themeElement.appendChild(themeElementData);
        themeElement.appendChild(div);

        
        
        themesContainer.appendChild(themeElement);
    });


});