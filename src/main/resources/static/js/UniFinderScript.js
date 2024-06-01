let currentPage = 1; // 현재 페이지
const resultsPerPage = 5; // 페이지 당 결과 수

document.getElementById('search-button').addEventListener('click', () => {
    const department = document.getElementById('department-input').value.trim();
    if (department) {
        currentPage = 1; // 검색 시 페이지를 1페이지로 초기화
        searchUniversities(department);
    } else {
        displayResults("blankResult");
    }
});

function searchUniversities(department) {
    // 학과에 따라 대학을 가져오는 API 엔드포인트
    const apiUrl = `/api/universities/${encodeURIComponent(department)}`;

    // API에서 데이터를 가져옵니다
    fetch(apiUrl)
        .then(response => {
            // 응답이 성공적인지 확인합니다 (상태 코드 200)
            if (!response.ok) {
                throw new Error('데이터를 가져오는 데 실패했습니다');
            }
            // JSON 응답을 파싱합니다
            return response.json();
        })
        .then(data => {
            // 전체 페이지 수 계산
            const totalPages = Math.ceil(data.length / resultsPerPage);

            // 현재 페이지에 해당하는 결과를 가져옵니다
            const startIndex = (currentPage - 1) * resultsPerPage;
            const endIndex = startIndex + resultsPerPage;
            const results = data.slice(startIndex, endIndex);

            // 결과를 표시하고 페이징을 업데이트합니다
            displayResults(results);
            updatePagination(totalPages);
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
            // 오류를 처리합니다 - 사용자에게 메시지를 표시하거나 로그를 기록합니다
        });
}

function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    console.log(results)

    if (results === "blankResult") {
        resultsList.innerHTML = '<li>검색 값을 입력해주세요.</li>';
    } else if (results.length === 0) {
        resultsList.innerHTML = '<li>검색 결과를 찾을수 없습니다.</li>';
    } else {
        results.forEach((univ) => {
            const listItem = document.createElement('li');
            const univName = document.createElement('span'); // 대학 이름 표시를 위한 span 요소
            univName.textContent = univ.name;
            listItem.appendChild(univName); // 리스트 아이템에 대학 이름 추가

            const toggleMapButton = document.createElement('button'); // 지도 토글 버튼 생성
            toggleMapButton.textContent = '지도보기';
            toggleMapButton.addEventListener('click', () => {
                toggleMapVisibility(univ.name); // 지도 가시성을 토글하는 함수 호출
            });
            listItem.appendChild(toggleMapButton); // 리스트 아이템에 버튼 추가

            const mapContainer = document.createElement('div'); // 지도를 표시할 div 요소 생성
            mapContainer.id = `map-${univ.name.replace(/\s+/g, '-').toLowerCase()}`; // 대학 이름에 공백이 있을 수 있으므로 대시로 구분된 ID 생성
            mapContainer.style.width = '300px';
            mapContainer.style.height = '200px';
            mapContainer.style.display = 'none'; // 처음에는 숨겨진 상태로 설정
            listItem.appendChild(mapContainer); // 리스트 아이템에 지도 컨테이너 추가

            resultsList.appendChild(listItem); // 결과 리스트에 리스트 아이템 추가
        });

    }
}

function toggleMapVisibility(univName) {
    const mapContainer = document.getElementById(`map-${univName.replace(/\s+/g, '-').toLowerCase()}`); // 대학 이름에 해당하는 지도 컨테이너 선택
    const toggleMapButton = mapContainer.previousSibling;

    if (mapContainer.style.display === 'none') {
        mapContainer.style.display = 'block'; // 지도 컨테이너가 숨겨져 있으면 보이도록 변경
        toggleMapButton.textContent = '지도 닫기'; // 버튼 텍스트 변경

        // 카카오 맵 초기화 및 표시
        const map = new kakao.maps.Map(mapContainer, {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청을 중심으로 설정 (예시)
            level: 3 // 확대 수준 설정 (예시)
        });
    } else {
        mapContainer.style.display = 'none'; // 지도 컨테이너가 보이고 있으면 숨김
        toggleMapButton.textContent = '지도보기'; // 버튼 텍스트 변경
    }
}


function updatePagination(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // 이전에 생성된 페이지 버튼을 모두 제거

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i; // 해당 페이지로 currentPage 업데이트
            searchUniversities(document.getElementById('department-input').value.trim());
        });

        paginationContainer.appendChild(pageButton);
    }
}

