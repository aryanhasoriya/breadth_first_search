/**
 * Breadth First Search (BFS) Interactive Educational Application
 * Recreates the step-by-step graph traversal and FIFO queue trace.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. GRAPH DATA STRUCTURE & ALGORITHM TRACE DEFINITION
  // --------------------------------------------------------------------------
  const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: [],
    F: []
  };

  const nodePositions = {
    A: { x: 270, y: 52, level: 0 },
    B: { x: 150, y: 152, level: 1 },
    C: { x: 390, y: 152, level: 1 },
    D: { x: 90,  y: 262, level: 2 },
    E: { x: 210, y: 262, level: 2 },
    F: { x: 390, y: 262, level: 2 }
  };

  const edges = [
    { from: 'A', to: 'B', id: 'edge-A-B' },
    { from: 'A', to: 'C', id: 'edge-A-C' },
    { from: 'B', to: 'D', id: 'edge-B-D' },
    { from: 'B', to: 'E', id: 'edge-B-E' },
    { from: 'C', to: 'F', id: 'edge-C-F' }
  ];

  // The 7 deterministic steps matching the course poster trace
  const simulationSteps = [
    {
      step: 0,
      badge: 'READY',
      actionTitle: 'Initial State (Source s = A)',
      description: 'The graph is in its neutral state. Click "Start BFS" or "Next Step" to begin level-order exploration from source vertex A.',
      currentNode: null,
      queue: [],
      visited: [],
      traversal: [],
      activeEdges: [],
      traversedEdges: [],
      nodeStates: { A: 'unvisited', B: 'unvisited', C: 'unvisited', D: 'unvisited', E: 'unvisited', F: 'unvisited' },
      codeLines: [1],
      codeSummary: 'Line 1: BFS(start)'
    },
    {
      step: 1,
      badge: 'STEP 01',
      actionTitle: 'Initialize: Start s = A',
      description: 'Root vertex A is discovered. It is marked as visited and enqueued into the FIFO queue as the initial exploration frontier.',
      currentNode: null,
      queuedThisStep: ['A'],
      queue: ['A'],
      visited: ['A'],
      traversal: [],
      activeEdges: [],
      traversedEdges: [],
      nodeStates: { A: 'queued', B: 'unvisited', C: 'unvisited', D: 'unvisited', E: 'unvisited', F: 'unvisited' },
      codeLines: [2, 3, 4],
      codeSummary: 'Lines 2–4: Enqueue & mark start visited'
    },
    {
      step: 2,
      badge: 'STEP 02',
      actionTitle: 'Pop A → Enqueue (B, C)',
      description: 'Front node A is dequeued and processed. Its immediate unvisited neighbours B and C (Level 1) are marked as visited and pushed to the REAR of the queue.',
      currentNode: 'A',
      queuedThisStep: ['B', 'C'],
      queue: ['B', 'C'],
      visited: ['A', 'B', 'C'],
      traversal: ['A'],
      activeEdges: ['edge-A-B', 'edge-A-C'],
      traversedEdges: ['edge-A-B', 'edge-A-C'],
      nodeStates: { A: 'current', B: 'queued', C: 'queued', D: 'unvisited', E: 'unvisited', F: 'unvisited' },
      codeLines: [7, 8, 10, 11, 12, 13],
      codeSummary: 'Lines 7, 8, 12, 13: Dequeue front (A), enqueue (B, C)'
    },
    {
      step: 3,
      badge: 'STEP 03',
      actionTitle: 'Pop B → Enqueue (D, E)',
      description: 'Front node B is dequeued from the queue and visited. Its unvisited child neighbours D and E (Level 2) are marked as visited and appended to the queue REAR.',
      currentNode: 'B',
      queuedThisStep: ['D', 'E'],
      queue: ['C', 'D', 'E'],
      visited: ['A', 'B', 'C', 'D', 'E'],
      traversal: ['A', 'B'],
      activeEdges: ['edge-B-D', 'edge-B-E'],
      traversedEdges: ['edge-A-B', 'edge-A-C', 'edge-B-D', 'edge-B-E'],
      nodeStates: { A: 'visited', B: 'current', C: 'queued', D: 'queued', E: 'queued', F: 'unvisited' },
      codeLines: [7, 8, 10, 11, 12, 13],
      codeSummary: 'Lines 7, 8, 12, 13: Dequeue front (B), enqueue (D, E)'
    },
    {
      step: 4,
      badge: 'STEP 04',
      actionTitle: 'Pop C → Enqueue (F)',
      description: 'Front node C is dequeued from the queue and visited. Its unvisited neighbour F (Level 2) is marked as visited and enqueued. All vertices are now discovered.',
      currentNode: 'C',
      queuedThisStep: ['F'],
      queue: ['D', 'E', 'F'],
      visited: ['A', 'B', 'C', 'D', 'E', 'F'],
      traversal: ['A', 'B', 'C'],
      activeEdges: ['edge-C-F'],
      traversedEdges: ['edge-A-B', 'edge-A-C', 'edge-B-D', 'edge-B-E', 'edge-C-F'],
      nodeStates: { A: 'visited', B: 'visited', C: 'current', D: 'queued', E: 'queued', F: 'queued' },
      codeLines: [7, 8, 10, 11, 12, 13],
      codeSummary: 'Lines 7, 8, 12, 13: Dequeue front (C), enqueue (F)'
    },
    {
      step: 5,
      badge: 'STEP 05',
      actionTitle: 'Pop D → No unvisited neighbours',
      description: 'Front node D is dequeued and visited. As a leaf vertex, D has no outgoing unvisited neighbours. Queue advances.',
      currentNode: 'D',
      queuedThisStep: [],
      queue: ['E', 'F'],
      visited: ['A', 'B', 'C', 'D', 'E', 'F'],
      traversal: ['A', 'B', 'C', 'D'],
      activeEdges: [],
      traversedEdges: ['edge-A-B', 'edge-A-C', 'edge-B-D', 'edge-B-E', 'edge-C-F'],
      nodeStates: { A: 'visited', B: 'visited', C: 'visited', D: 'current', E: 'queued', F: 'queued' },
      codeLines: [7, 8, 10, 15],
      codeSummary: 'Lines 7, 8, 10, 15: Dequeue front (D), no new neighbours'
    },
    {
      step: 6,
      badge: 'STEP 06',
      actionTitle: 'Pop E → No unvisited neighbours',
      description: 'Front node E is dequeued and visited. E has no unvisited neighbours. Only node F remains in the FIFO queue.',
      currentNode: 'E',
      queuedThisStep: [],
      queue: ['F'],
      visited: ['A', 'B', 'C', 'D', 'E', 'F'],
      traversal: ['A', 'B', 'C', 'D', 'E'],
      activeEdges: [],
      traversedEdges: ['edge-A-B', 'edge-A-C', 'edge-B-D', 'edge-B-E', 'edge-C-F'],
      nodeStates: { A: 'visited', B: 'visited', C: 'visited', D: 'visited', E: 'current', F: 'queued' },
      codeLines: [7, 8, 10, 15],
      codeSummary: 'Lines 7, 8, 10, 15: Dequeue front (E), no new neighbours'
    },
    {
      step: 7,
      badge: 'COMPLETE',
      actionTitle: 'Pop F → Queue is Empty',
      description: 'Final node F is dequeued and processed. The queue is now empty. Breadth First Search traversal is complete across all reachable vertices.',
      currentNode: 'F',
      queuedThisStep: [],
      queue: [],
      visited: ['A', 'B', 'C', 'D', 'E', 'F'],
      traversal: ['A', 'B', 'C', 'D', 'E', 'F'],
      activeEdges: [],
      traversedEdges: ['edge-A-B', 'edge-A-C', 'edge-B-D', 'edge-B-E', 'edge-C-F'],
      nodeStates: { A: 'visited', B: 'visited', C: 'visited', D: 'visited', E: 'visited', F: 'current' },
      codeLines: [7, 8, 16, 17],
      codeSummary: 'Lines 7, 8, 16, 17: Dequeue front (F), loop terminates'
    }
  ];

  // --------------------------------------------------------------------------
  // 2. STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentStepIndex = 0;
  let isAutoPlaying = false;
  let autoPlayTimer = null;
  let autoPlaySpeedMs = 1200;

  // DOM Element References
  const btnStart = document.getElementById('btnStart');
  const btnNext = document.getElementById('btnNext');
  const btnAutoPlay = document.getElementById('btnAutoPlay');
  const btnReset = document.getElementById('btnReset');

  const queueTrack = document.getElementById('queueTrack');
  const visitedList = document.getElementById('visitedList');
  const traversalSequence = document.getElementById('traversalSequence');

  const stepBadge = document.getElementById('stepBadge');
  const stepHeadline = document.getElementById('stepHeadline');
  const stepDescription = document.getElementById('stepDescription');
  const codeLineTag = document.getElementById('codeLineTag');
  const completionBanner = document.getElementById('completionBanner');

  const traceTableBody = document.getElementById('traceTableBody');
  const tableContainer = document.getElementById('tableContainer');

  const copyCodeBtn = document.getElementById('copyCodeBtn');

  // --------------------------------------------------------------------------
  // 3. SVG GRAPH INITIALIZATION & RENDERING
  // --------------------------------------------------------------------------
  function createSvgGraph() {
    const svg = document.getElementById('graphSvg');
    if (!svg) return;

    svg.innerHTML = '';

    // Create SVG Defs for markers/filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.1" />
      </filter>
    `;
    svg.appendChild(defs);

    // 1. Level guide lines and distance annotations
    const levels = [
      { y: 52, text: 'Level 0', dist: 'dist(0) = {A}' },
      { y: 152, text: 'Level 1', dist: 'dist(1) = {B, C}' },
      { y: 262, text: 'Level 2', dist: 'dist(2) = {D, E, F}' }
    ];

    levels.forEach(lvl => {
      // Guide Line
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '20');
      line.setAttribute('y1', lvl.y);
      line.setAttribute('x2', '520');
      line.setAttribute('y2', lvl.y);
      line.setAttribute('class', 'level-guide-line');
      svg.appendChild(line);

      // Level Label Left
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '24');
      label.setAttribute('y', lvl.y - 10);
      label.setAttribute('class', 'level-guide-text');
      label.textContent = lvl.text;
      svg.appendChild(label);

      // Distance Label Right
      const dist = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      dist.setAttribute('x', '516');
      dist.setAttribute('y', lvl.y - 10);
      dist.setAttribute('text-anchor', 'end');
      dist.setAttribute('class', 'level-dist-text');
      dist.textContent = lvl.dist;
      svg.appendChild(dist);
    });

    // 2. Edges
    const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    edgesGroup.setAttribute('id', 'edgesGroup');

    edges.forEach(edge => {
      const p1 = nodePositions[edge.from];
      const p2 = nodePositions[edge.to];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      line.setAttribute('id', edge.id);
      line.setAttribute('class', 'graph-edge');
      edgesGroup.appendChild(line);
    });
    svg.appendChild(edgesGroup);

    // 3. Nodes
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('id', 'nodesGroup');

    Object.keys(nodePositions).forEach(nodeKey => {
      const pos = nodePositions[nodeKey];
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('id', `node-group-${nodeKey}`);
      group.setAttribute('class', 'node-group state-unvisited');
      group.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);

      // Circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'node-circle');
      circle.setAttribute('cx', '0');
      circle.setAttribute('cy', '0');
      circle.setAttribute('r', '22');

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('class', 'node-label');
      label.setAttribute('x', '0');
      label.setAttribute('y', '1');
      label.textContent = nodeKey;

      group.appendChild(circle);
      group.appendChild(label);
      nodesGroup.appendChild(group);
    });
    svg.appendChild(nodesGroup);
  }

  // --------------------------------------------------------------------------
  // 4. STEP RENDERING & UI SYNCHRONIZATION
  // --------------------------------------------------------------------------
  function renderStep(stepIndex) {
    const stepData = simulationSteps[stepIndex];
    if (!stepData) return;

    // 1. Update Graph Nodes & Edges
    Object.keys(nodePositions).forEach(nodeKey => {
      const nodeGroup = document.getElementById(`node-group-${nodeKey}`);
      if (nodeGroup) {
        const state = stepData.nodeStates[nodeKey] || 'unvisited';
        nodeGroup.setAttribute('class', `node-group state-${state}`);
      }
    });

    edges.forEach(edge => {
      const edgeElem = document.getElementById(edge.id);
      if (edgeElem) {
        if (stepData.activeEdges.includes(edge.id)) {
          edgeElem.setAttribute('class', 'graph-edge active');
        } else if (stepData.traversedEdges.includes(edge.id)) {
          edgeElem.setAttribute('class', 'graph-edge traversed');
        } else {
          edgeElem.setAttribute('class', 'graph-edge');
        }
      }
    });

    // 2. Update FIFO Queue Display
    if (queueTrack) {
      queueTrack.innerHTML = '';
      if (stepData.queue.length === 0) {
        const emptyMsg = document.createElement('span');
        emptyMsg.className = 'queue-empty-msg';
        emptyMsg.textContent = stepIndex === 7 ? '[ Empty — BFS Complete ]' : '[ Empty ]';
        queueTrack.appendChild(emptyMsg);
      } else {
        stepData.queue.forEach((item, idx) => {
          const itemEl = document.createElement('div');
          itemEl.className = 'queue-item';
          itemEl.textContent = item;
          if (idx === 0) {
            itemEl.title = 'Front of Queue (Next to be dequeued)';
          }
          queueTrack.appendChild(itemEl);
        });
      }
    }

    // 3. Update Visited Set Display
    if (visitedList) {
      visitedList.innerHTML = '';
      if (stepData.visited.length === 0) {
        const emptyMsg = document.createElement('span');
        emptyMsg.className = 'queue-empty-msg';
        emptyMsg.textContent = '{ } (No vertices visited yet)';
        visitedList.appendChild(emptyMsg);
      } else {
        stepData.visited.forEach(item => {
          const pill = document.createElement('span');
          pill.className = 'visited-pill';
          pill.textContent = item;
          visitedList.appendChild(pill);
        });
      }
    }

    // 4. Update Traversal Sequence Display
    if (traversalSequence) {
      traversalSequence.innerHTML = '';
      if (stepData.traversal.length === 0) {
        const emptyMsg = document.createElement('span');
        emptyMsg.className = 'queue-empty-msg';
        emptyMsg.textContent = '— (Traversal sequence will build here)';
        traversalSequence.appendChild(emptyMsg);
      } else {
        stepData.traversal.forEach((node, idx) => {
          const nodeSpan = document.createElement('span');
          nodeSpan.className = 'traversal-node';
          nodeSpan.textContent = node;
          traversalSequence.appendChild(nodeSpan);

          if (idx < stepData.traversal.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'traversal-arrow';
            arrow.textContent = '→';
            traversalSequence.appendChild(arrow);
          }
        });
      }
    }

    // 5. Update Step Explanation Area & Code Line Tag
    if (stepBadge) stepBadge.textContent = stepData.badge;
    if (stepHeadline) stepHeadline.textContent = stepData.actionTitle;
    if (stepDescription) stepDescription.textContent = stepData.description;
    if (codeLineTag) codeLineTag.textContent = stepData.codeSummary || 'Line 1: BFS(start)';

    // 6. Highlight Active Pseudocode Lines
    const allCodeLines = document.querySelectorAll('.code-line');
    allCodeLines.forEach(lineEl => lineEl.classList.remove('active-line'));

    if (stepData.codeLines && stepData.codeLines.length > 0) {
      stepData.codeLines.forEach(lineNum => {
        const targetLine = document.getElementById(`code-line-${lineNum}`);
        if (targetLine) {
          targetLine.classList.add('active-line');
        }
      });
    }

    // 7. Update Completion Banner
    if (completionBanner) {
      if (stepIndex === 7) {
        completionBanner.classList.add('show');
      } else {
        completionBanner.classList.remove('show');
      }
    }

    // 8. Update Control Buttons State
    if (btnStart) btnStart.disabled = (stepIndex > 0 && stepIndex < 7);
    if (btnNext) btnNext.disabled = (stepIndex >= 7);

    // 9. Update Trace Table Highlights & Visibility
    updateTraceTable(stepIndex);
  }

  // --------------------------------------------------------------------------
  // 5. TRACE TABLE POPULATION & SYNCHRONIZATION
  // --------------------------------------------------------------------------
  const tableData = [
    { stepNum: 1, action: 'Start s = A', queueOp: 'Enqueue (A)', queueState: '[ A ]', visited: '{ A }', visitOrder: '—' },
    { stepNum: 2, action: 'Pop A', queueOp: 'Enqueue (B, C)', queueState: '[ B, C ]', visited: '{ A, B, C }', visitOrder: 'A' },
    { stepNum: 3, action: 'Pop B', queueOp: 'Enqueue (D, E)', queueState: '[ C, D, E ]', visited: '{ A, B, C, D, E }', visitOrder: 'A → B' },
    { stepNum: 4, action: 'Pop C', queueOp: 'Enqueue (F)', queueState: '[ D, E, F ]', visited: '{ A, B, C, D, E, F }', visitOrder: 'A → B → C' },
    { stepNum: 5, action: 'Pop D', queueOp: 'No unvisited', queueState: '[ E, F ]', visited: '{ A, B, C, D, E, F }', visitOrder: 'A → B → C → D' },
    { stepNum: 6, action: 'Pop E', queueOp: 'No unvisited', queueState: '[ F ]', visited: '{ A, B, C, D, E, F }', visitOrder: 'A → B → C → D → E' },
    { stepNum: 7, action: 'Pop F', queueOp: 'No unvisited', queueState: '[ Empty ]', visited: '{ A, B, C, D, E, F }', visitOrder: 'A → B → C → D → E → F' }
  ];


  function initTraceTable() {
    if (!traceTableBody) return;
    traceTableBody.innerHTML = '';

    tableData.forEach(row => {
      const tr = document.createElement('tr');
      tr.id = `trace-row-${row.stepNum}`;
      tr.innerHTML = `
        <td class="mono"><strong>Step ${row.stepNum}</strong></td>
        <td>${row.action}</td>
        <td class="mono">${row.queueOp}</td>
        <td class="mono">${row.queueState}</td>
        <td class="mono">${row.visited}</td>
        <td class="mono">${row.visitOrder}</td>
      `;
      traceTableBody.appendChild(tr);
    });
  }

  function updateTraceTable(currentStep) {
    if (!traceTableBody) return;

    for (let i = 1; i <= 7; i++) {
      const row = document.getElementById(`trace-row-${i}`);
      if (!row) continue;

      if (i === currentStep) {
        row.className = 'current-step-row';
      } else {
        row.className = '';
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. SIMULATION CONTROLS & AUTO-PLAY
  // --------------------------------------------------------------------------
  function goToStep(stepIndex) {
    currentStepIndex = Math.max(0, Math.min(simulationSteps.length - 1, stepIndex));
    renderStep(currentStepIndex);

    if (currentStepIndex >= simulationSteps.length - 1 && isAutoPlaying) {
      stopAutoPlay();
    }
  }

  function startBfs() {
    goToStep(1);
  }

  function nextStep() {
    if (currentStepIndex < simulationSteps.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  }

  function resetBfs() {
    stopAutoPlay();
    goToStep(0);
  }

  function toggleAutoPlay() {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function startAutoPlay() {
    if (currentStepIndex >= simulationSteps.length - 1) {
      goToStep(0);
    }
    isAutoPlaying = true;
    if (btnAutoPlay) {
      btnAutoPlay.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        <span>Pause</span>
      `;
      btnAutoPlay.classList.add('btn-primary');
      btnAutoPlay.classList.remove('btn-outline');
    }

    autoPlayTimer = setInterval(() => {
      if (currentStepIndex < simulationSteps.length - 1) {
        nextStep();
      } else {
        stopAutoPlay();
      }
    }, autoPlaySpeedMs);
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
    if (btnAutoPlay) {
      btnAutoPlay.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Auto Play</span>
      `;
      btnAutoPlay.classList.remove('btn-primary');
      btnAutoPlay.classList.add('btn-outline');
    }
  }

  // --------------------------------------------------------------------------
  // 7. EVENT LISTENERS & INITIALIZATION
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    if (btnStart) btnStart.addEventListener('click', startBfs);
    if (btnNext) btnNext.addEventListener('click', nextStep);
    if (btnAutoPlay) btnAutoPlay.addEventListener('click', toggleAutoPlay);
    if (btnReset) btnReset.addEventListener('click', resetBfs);





    // Pseudocode Copy Button
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const codeText = `BFS(start)
    Queue ← empty
    Add start to Queue
    Mark start as visited

    while Queue is not empty
        node ← remove front element from Queue
        print node

        for each neighbour of node
            if neighbour is not visited
                Mark neighbour as visited
                Add neighbour to Queue
            end if
        end for
    end while
end BFS`;

        navigator.clipboard.writeText(codeText).then(() => {
          const originalText = copyCodeBtn.textContent;
          copyCodeBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyCodeBtn.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy pseudocode:', err);
        });
      });
    }

    // Navigation Active Link Spy
    setupScrollSpy();
  }

  function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.pageYOffset + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 8. BOOTSTRAP APPLICATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    createSvgGraph();
    initTraceTable();
    setupEventListeners();
    goToStep(0);
  });

})();
