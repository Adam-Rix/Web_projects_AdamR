let tableItems = [];
let originalTableItems = [];
let pages = 0;
let currentPage = 1;
const itemsPerPage = 10;
const sortColumnIcon = {
  graph: "default",
  nodes: "default",
  edges: "default",
}

async function getData() {
  const response = await fetch("./db.json");
  tableItems = await response.json();
  originalTableItems = [...tableItems];
  initPagination()
}

function numPages(items) {
  return Math.ceil(items.length / itemsPerPage);
}

function changePage(page) {
  handleActivePageNumber()
  const output = document.querySelector('.table__body');
  if (page < 1) page = 1;
  if (page > pages) page = pages;
  output.innerHTML = "";
  if (tableItems.length > 0) {
    for (let i = (page - 1) * itemsPerPage; i < (page * itemsPerPage) && i < tableItems.length; i++) {
      output.innerHTML += `<tr class="table__body-row">
                            <td><a href="${tableItems[i].graph.link}">${tableItems[i].graph.name}</a></td>
                            <td>${tableItems[i].nodes}</td>
                            <td>${tableItems[i].edges}</td>
                            <td><a href="${tableItems[i].action.link}">${tableItems[i].action.name}</a></td>
                          </tr>`;
    }
  }

}

function nextPage() {
  if (currentPage < pages) changePage(++currentPage)
}

function prevPage() {
  if (currentPage > 1) changePage(--currentPage)
}

function gotoPage(page) {
  currentPage = page
  changePage(page)
}

function addPages() {
  const el = document.getElementById('pages');
  el.innerHTML = "";
  if (pages === 0) {
    pages = 1;
  }
  for (let i = 1; i < pages + 1; i++) {
    el.innerHTML += `<li id="pages-item" onclick="gotoPage(${i})">${i}</li>`
  }
}

function handleActivePageNumber() {
  document.querySelectorAll('#pages-item').forEach((element, index) => {
    element.classList.remove("active");
    if (currentPage === index + 1) {
      element.classList.add("active");
    }
  })
};

function filterGraph() {
  const value = document.getElementById("graph").value;
  if (value) {
    tableItems = originalTableItems.filter((item) => item.graph.name === value);
  } else {
    tableItems = originalTableItems
  }
  initPagination();
}

function filterNodes() {
  const value = parseInt(document.getElementById("nodes").value, 10);
  if (value) {
    tableItems = originalTableItems.filter((item) => item.nodes === value);
  } else {
    tableItems = originalTableItems
  }
  initPagination()
}

function filterEdges() {
  const value = parseInt(document.getElementById("edges").value, 10);
  if (value) {
    tableItems = originalTableItems.filter((item) => item.edges === value);
  } else {
    tableItems = originalTableItems
  }
  initPagination()
}

function displaySortIcon(name, type) {
  switch (name) {
    case "default":
      sortColumnIcon[type] = 'desc';
      return "&#8595;"
    case "desc":
      sortColumnIcon[type] = 'asc';
      return "&#8593;"
    case "asc":
      sortColumnIcon[type] = 'default';
      return "&#8645;"
    default:
      return "&#8645;"
  }
}

function resetSortColumn(type) {
  for (const property in sortColumnIcon) {
    if (property !== type) {
      document.getElementById(`${property}-icon`).innerHTML = "&#8645;";
      sortColumnIcon[property] = "default";
    }
  }
}

function sortColumn(name) {
  switch (name) {
    case "Graph": {
      document.getElementById("graph-icon").innerHTML = displaySortIcon(sortColumnIcon.graph, 'graph');
      const originalData = originalTableItems.slice();
      if (sortColumnIcon.graph === 'desc') {
        tableItems = originalData.sort((a, b) => (a.graph.name < b.graph.name ? -1 : 1));
      } else if (sortColumnIcon.graph === 'asc') {
        tableItems = originalData.sort((a, b) => (a.graph.name > b.graph.name ? -1 : 1));
      } else {
        tableItems = originalData;
      }
      resetSortColumn("graph");
      changePage(1);
      break;
    }
    case "Nodes": {
      document.getElementById("nodes-icon").innerHTML = displaySortIcon(sortColumnIcon.nodes, 'nodes')
      const originalData = originalTableItems.slice();
      if (sortColumnIcon.nodes === 'desc') {
        tableItems = originalTableItems.sort((a, b) => a.nodes - b.nodes);
      } else if (sortColumnIcon.nodes === 'asc') {
        tableItems = originalTableItems.sort((a, b) => b.nodes - a.nodes);
      } else {
        tableItems = originalData;
      }
      resetSortColumn("nodes");
      changePage(1);
      break;
    }
    case "Edges": {
      document.getElementById("edges-icon").innerHTML = displaySortIcon(sortColumnIcon.edges, 'edges')
      const originalData = originalTableItems.slice();
      if (sortColumnIcon.edges === 'desc') {
        tableItems = originalTableItems.sort((a, b) => a.edges - b.edges);
      } else if (sortColumnIcon.edges === 'asc') {
        tableItems = originalTableItems.sort((a, b) => b.edges - a.edges);
      } else {
        tableItems = originalData;
      }
      resetSortColumn("edges");
      changePage(1);
      break;
    }
    default:
      return
  }
}

function initPagination() {
  pages = numPages(tableItems);
  changePage(1);
  addPages();
  handleActivePageNumber()
}

window.onload = function () {
  getData();
};