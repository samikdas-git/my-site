(function () {
    'use strict';

    /* ═══════════════════════════ CSS ══════════════════════════════ */
    var css = `
    /* ── Launcher cluster ──────────────────────────────────────── */
    #sd-launcher {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    #sd-launcher.hidden {
        opacity: 0;
        pointer-events: none;
        transform: translateY(6px);
    }

    /* ── Q&A circle button ─────────────────────────────────────── */
    #sd-qa-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #B56840;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(181,104,64,0.45);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        outline: none;
        flex-shrink: 0;
    }
    #sd-qa-btn:hover {
        transform: scale(1.07);
        box-shadow: 0 6px 26px rgba(181,104,64,0.55);
    }
    #sd-qa-btn svg { width: 24px; height: 24px; fill: #F3EBD6; }

    /* ── Get Proposal pill button ──────────────────────────────── */
    #sd-proposal-btn {
        height: 38px;
        padding: 0 18px;
        border-radius: 19px;
        background: #1D1108;
        border: 1px solid rgba(181,104,64,0.55);
        color: #B56840;
        font-family: 'Jost', 'Gill Sans', Optima, Tahoma, sans-serif;
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        white-space: nowrap;
        box-shadow: 0 2px 14px rgba(0,0,0,0.4);
        outline: none;
    }
    #sd-proposal-btn:hover {
        background: #B56840;
        color: #F3EBD6;
        border-color: #B56840;
        box-shadow: 0 4px 18px rgba(181,104,64,0.4);
    }

    /* ── Shared panel base ─────────────────────────────────────── */
    .sd-panel {
        position: fixed;
        bottom: 96px;
        right: 28px;
        z-index: 9998;
        width: 360px;
        max-width: calc(100vw - 40px);
        height: 480px;
        max-height: calc(100svh - 120px);
        background: #1D1108;
        border: 1px solid rgba(181,104,64,0.25);
        border-radius: 14px;
        box-shadow: 0 12px 48px rgba(0,0,0,0.55);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(12px) scale(0.97);
        pointer-events: none;
        transition: opacity 0.22s ease, transform 0.22s ease;
    }
    .sd-panel.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
    }

    /* ── Panel header ──────────────────────────────────────────── */
    .sd-header {
        padding: 16px 20px 14px;
        border-bottom: 1px solid rgba(243,235,214,0.1);
        flex-shrink: 0;
    }
    #sd-prop-panel .sd-header { padding-bottom: 0; }

    .sd-header-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .sd-header-label {
        font-family: 'Jost', 'Gill Sans', Optima, Tahoma, sans-serif;
        font-size: 9px;
        font-weight: 400;
        letter-spacing: 3.5px;
        text-transform: uppercase;
        color: #B56840;
        margin: 0 0 4px;
    }
    .sd-header-title {
        font-family: 'Cormorant Garamond', Palatino, 'Book Antiqua', Georgia, serif;
        font-size: 17px;
        font-weight: 400;
        letter-spacing: 0.3px;
        color: #F3EBD6;
        margin: 0;
    }
    .sd-close-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin: -4px -4px 0 8px;
        opacity: 0.4;
        transition: opacity 0.15s ease;
        flex-shrink: 0;
        outline: none;
    }
    .sd-close-btn:hover { opacity: 0.75; }
    .sd-close-btn svg { width: 16px; height: 16px; stroke: #F3EBD6; fill: none; display: block; }

    /* ── Progress bar (proposal panel only) ───────────────────── */
    #sd-prop-progress-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0 12px;
        margin: 0 20px;
    }
    #sd-prop-progress-track {
        flex: 1;
        height: 2px;
        background: rgba(243,235,214,0.09);
        border-radius: 1px;
        overflow: hidden;
    }
    #sd-prop-progress-fill {
        height: 100%;
        background: #B56840;
        border-radius: 1px;
        width: 0%;
        transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    #sd-prop-step-text {
        font-family: 'Jost', 'Gill Sans', Optima, Tahoma, sans-serif;
        font-size: 8.5px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: rgba(181,104,64,0.65);
        white-space: nowrap;
        flex-shrink: 0;
    }

    /* ── Messages area ─────────────────────────────────────────── */
    .sd-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scroll-behavior: smooth;
    }
    .sd-messages::-webkit-scrollbar { width: 4px; }
    .sd-messages::-webkit-scrollbar-track { background: transparent; }
    .sd-messages::-webkit-scrollbar-thumb { background: rgba(181,104,64,0.35); border-radius: 2px; }

    .sd-msg {
        max-width: 88%;
        font-family: 'Lora', 'Palatino Linotype', Georgia, serif;
        font-size: 13.5px;
        line-height: 1.65;
        padding: 10px 14px;
        border-radius: 10px;
        animation: sd-fade-in 0.18s ease forwards;
    }
    .sd-msg-assistant {
        align-self: flex-start;
        background: rgba(243,235,214,0.07);
        color: #EAE0C6;
        border-bottom-left-radius: 3px;
    }
    .sd-msg-user {
        align-self: flex-end;
        background: #B56840;
        color: #F3EBD6;
        border-bottom-right-radius: 3px;
    }
    .sd-msg-error {
        align-self: flex-start;
        background: rgba(180,60,60,0.18);
        color: #F3C5C5;
        border-bottom-left-radius: 3px;
    }

    /* ── Typing indicator ──────────────────────────────────────── */
    .sd-typing {
        align-self: flex-start;
        background: rgba(243,235,214,0.07);
        border-radius: 10px;
        border-bottom-left-radius: 3px;
        padding: 12px 16px;
        display: flex;
        gap: 5px;
        align-items: center;
    }
    .sd-typing span {
        width: 6px;
        height: 6px;
        background: #B56840;
        border-radius: 50%;
        display: inline-block;
        animation: sd-bounce 1.2s infinite;
    }
    .sd-typing span:nth-child(2) { animation-delay: 0.2s; }
    .sd-typing span:nth-child(3) { animation-delay: 0.4s; }

    /* ── Input area ────────────────────────────────────────────── */
    .sd-input-wrap {
        flex-shrink: 0;
        border-top: 1px solid rgba(243,235,214,0.1);
        display: flex;
        align-items: flex-end;
        gap: 8px;
        padding: 12px 14px 14px;
        background: rgba(0,0,0,0.2);
        transition: opacity 0.25s ease;
    }
    .sd-input-wrap.sd-done {
        opacity: 0;
        pointer-events: none;
    }
    .sd-input {
        flex: 1;
        background: rgba(243,235,214,0.07);
        border: 1px solid rgba(243,235,214,0.1);
        border-radius: 7px;
        outline: none;
        resize: none;
        font-family: 'Jost', 'Gill Sans', Optima, Tahoma, sans-serif;
        font-size: 13px;
        font-weight: 300;
        color: #F3EBD6;
        line-height: 1.5;
        max-height: 96px;
        overflow-y: auto;
        padding: 7px 10px;
        transition: border-color 0.15s ease;
    }
    .sd-input:focus {
        border-color: rgba(181,104,64,0.5);
        background: rgba(243,235,214,0.1);
    }
    .sd-input::placeholder { color: rgba(243,235,214,0.28); }
    .sd-input::-webkit-scrollbar { width: 3px; }
    .sd-input::-webkit-scrollbar-thumb { background: rgba(181,104,64,0.3); }

    .sd-send-btn {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
        background: #B56840;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, opacity 0.15s ease;
        align-self: flex-end;
        outline: none;
    }
    .sd-send-btn:hover { background: #9E5A34; }
    .sd-send-btn:disabled { opacity: 0.4; cursor: default; }
    .sd-send-btn svg { width: 16px; height: 16px; fill: #F3EBD6; }

    @keyframes sd-fade-in {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes sd-bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30%            { transform: translateY(-5px); }
    }

    @media (max-width: 420px) {
        .sd-panel   { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
        #sd-launcher { right: 16px; bottom: 20px; }
    }
    `;

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ═══════════════════════ Launcher HTML ═══════════════════════ */
    var launcher = document.createElement('div');
    launcher.id = 'sd-launcher';
    launcher.innerHTML = `
        <button id="sd-proposal-btn" aria-label="Get a proposal">Get Proposal</button>
        <button id="sd-qa-btn" aria-label="Open chat">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            </svg>
        </button>`;
    document.body.appendChild(launcher);

    /* ═══════════════════════ Q&A panel HTML ══════════════════════ */
    var qaPanel = document.createElement('div');
    qaPanel.id = 'sd-qa-panel';
    qaPanel.className = 'sd-panel';
    qaPanel.setAttribute('role', 'dialog');
    qaPanel.setAttribute('aria-label', 'Chat with Samik');
    qaPanel.innerHTML = `
        <div class="sd-header">
            <div class="sd-header-row">
                <div>
                    <p class="sd-header-label">Ask me anything</p>
                    <p class="sd-header-title">Samik Das &nbsp;&middot;&nbsp; Coach</p>
                </div>
                <button class="sd-close-btn" id="sd-qa-close" aria-label="Close">
                    <svg viewBox="0 0 24 24"><path stroke-width="2" stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
        </div>
        <div class="sd-messages" id="sd-qa-messages" aria-live="polite"></div>
        <div class="sd-input-wrap" id="sd-qa-input-wrap">
            <textarea class="sd-input" id="sd-qa-input"
                placeholder="What are you navigating?"
                rows="1" aria-label="Your message" maxlength="1000"></textarea>
            <button class="sd-send-btn" id="sd-qa-send" aria-label="Send" disabled>
                <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
        </div>`;
    document.body.appendChild(qaPanel);

    /* ══════════════════════ Proposal panel HTML ══════════════════ */
    var propPanel = document.createElement('div');
    propPanel.id = 'sd-prop-panel';
    propPanel.className = 'sd-panel';
    propPanel.setAttribute('role', 'dialog');
    propPanel.setAttribute('aria-label', 'Get a proposal');
    propPanel.innerHTML = `
        <div class="sd-header">
            <div class="sd-header-row">
                <div>
                    <p class="sd-header-label">Get a Proposal</p>
                    <p class="sd-header-title">Samik Das &nbsp;&middot;&nbsp; Coach</p>
                </div>
                <button class="sd-close-btn" id="sd-prop-close" aria-label="Close">
                    <svg viewBox="0 0 24 24"><path stroke-width="2" stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <div id="sd-prop-progress-wrap">
                <div id="sd-prop-progress-track">
                    <div id="sd-prop-progress-fill"></div>
                </div>
                <span id="sd-prop-step-text">Step 1 of 6</span>
            </div>
        </div>
        <div class="sd-messages" id="sd-prop-messages" aria-live="polite"></div>
        <div class="sd-input-wrap" id="sd-prop-input-wrap">
            <textarea class="sd-input" id="sd-prop-input"
                placeholder="Your answer..."
                rows="1" aria-label="Your answer" maxlength="1000"></textarea>
            <button class="sd-send-btn" id="sd-prop-send" aria-label="Send" disabled>
                <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
        </div>`;
    document.body.appendChild(propPanel);

    /* ═══════════════════════════ State ═══════════════════════════ */
    var qaHistory    = [];
    var propHistory  = [];
    var qaOpen       = false;
    var propOpen     = false;
    var qaStarted    = false;
    var propStarted  = false;
    var propComplete = false;
    var qaBusy       = false;
    var propBusy     = false;

    /* ══════════════════════ Element refs ════════════════════════ */
    var qaBtn       = document.getElementById('sd-qa-btn');
    var proposalBtn = document.getElementById('sd-proposal-btn');

    var qaMsgs      = document.getElementById('sd-qa-messages');
    var qaInput     = document.getElementById('sd-qa-input');
    var qaSend      = document.getElementById('sd-qa-send');
    var qaClose     = document.getElementById('sd-qa-close');

    var propMsgs      = document.getElementById('sd-prop-messages');
    var propInput     = document.getElementById('sd-prop-input');
    var propSend      = document.getElementById('sd-prop-send');
    var propClose     = document.getElementById('sd-prop-close');
    var propInputWrap = document.getElementById('sd-prop-input-wrap');
    var propFill      = document.getElementById('sd-prop-progress-fill');
    var propStepText  = document.getElementById('sd-prop-step-text');

    /* ═══════════════════════ Helpers ════════════════════════════ */
    function addMsg(container, role, text) {
        var el = document.createElement('div');
        el.className = 'sd-msg sd-msg-' + role;
        el.textContent = text;
        container.appendChild(el);
        scrollBot(container);
        return el;
    }

    function addTyping(container) {
        var el = document.createElement('div');
        el.className = 'sd-typing';
        el.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(el);
        scrollBot(container);
        return el;
    }

    function scrollBot(container) {
        container.scrollTop = container.scrollHeight;
    }

    function autoHeight(ta) {
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
    }

    function updateProgress(step) {
        propFill.style.width = (step / 6 * 100).toFixed(1) + '%';
        propStepText.textContent = 'Step ' + step + ' of 6';
    }

    /* ══════════════════ Launcher visibility ═════════════════════ */
    function hideLauncher() { launcher.classList.add('hidden'); }
    function showLauncher() { launcher.classList.remove('hidden'); }

    /* ══════════════════════ Open / close ════════════════════════ */
    function openQA() {
        qaOpen = true;
        hideLauncher();
        qaPanel.classList.add('open');
        if (!qaStarted) {
            qaStarted = true;
            addMsg(qaMsgs, 'assistant', 'What brings you here? I am happy to answer questions about the coaching practice, the transition work, or anything else on the site.');
        }
        setTimeout(function () { qaInput.focus(); }, 220);
    }

    function closeQA() {
        qaOpen = false;
        qaPanel.classList.remove('open');
        if (!propOpen) showLauncher();
    }

    function openProposal() {
        propOpen = true;
        hideLauncher();
        propPanel.classList.add('open');
        if (!propStarted) {
            propStarted = true;
            startIntake();
        } else if (!propComplete) {
            setTimeout(function () { propInput.focus(); }, 220);
        }
    }

    function closeProposal() {
        propOpen = false;
        propPanel.classList.remove('open');
        if (!qaOpen) showLauncher();
    }

    qaBtn.addEventListener('click', openQA);
    proposalBtn.addEventListener('click', openProposal);
    qaClose.addEventListener('click', closeQA);
    propClose.addEventListener('click', closeProposal);

    /* ═══════════════════ Q&A input handling ═════════════════════ */
    qaInput.addEventListener('input', function () {
        autoHeight(qaInput);
        qaSend.disabled = qaBusy || qaInput.value.trim() === '';
    });
    qaInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!qaSend.disabled) sendQA();
        }
    });
    qaSend.addEventListener('click', sendQA);

    /* ═══════════════════ Proposal input handling ════════════════ */
    propInput.addEventListener('input', function () {
        autoHeight(propInput);
        propSend.disabled = propBusy || propInput.value.trim() === '';
    });
    propInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!propSend.disabled) sendProposal();
        }
    });
    propSend.addEventListener('click', sendProposal);

    /* ═════════════════════════ Q&A send ════════════════════════ */
    function sendQA() {
        var text = qaInput.value.trim();
        if (!text || qaBusy) return;

        addMsg(qaMsgs, 'user', text);
        qaHistory.push({ role: 'user', content: text });

        qaInput.value = '';
        qaInput.style.height = 'auto';
        qaSend.disabled = true;
        qaBusy = true;

        var typingEl = addTyping(qaMsgs);

        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: qaHistory })
        })
        .then(function (res) {
            if (!res.ok) return res.json().then(function (d) { throw new Error(d.error || 'Request failed'); });
            return res.json();
        })
        .then(function (data) {
            typingEl.remove();
            var reply = data.reply || "I didn't get a response. Try again, or reach out at dassamik2@gmail.com.";
            addMsg(qaMsgs, 'assistant', reply);
            qaHistory.push({ role: 'assistant', content: reply });
        })
        .catch(function (err) {
            typingEl.remove();
            addMsg(qaMsgs, 'error', 'Something went wrong. Please try again or email dassamik2@gmail.com directly.');
            console.error('Q&A error:', err);
        })
        .finally(function () {
            qaBusy = false;
            qaSend.disabled = qaInput.value.trim() === '';
            qaInput.focus();
        });
    }

    /* ══════════════════ Proposal intake start ══════════════════ */
    function startIntake() {
        propBusy = true;
        propSend.disabled = true;
        propInput.disabled = true;

        // Trigger message is in history but not shown in the UI
        propHistory.push({ role: 'user', content: "I'd like to get a proposal." });

        var typingEl = addTyping(propMsgs);

        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: propHistory })
        })
        .then(function (res) {
            if (!res.ok) return res.json().then(function (d) { throw new Error(d.error || 'Request failed'); });
            return res.json();
        })
        .then(function (data) {
            typingEl.remove();
            handlePropResponse(data);
        })
        .catch(function (err) {
            typingEl.remove();
            addMsg(propMsgs, 'error', 'Something went wrong. Please close and try again.');
            console.error('Intake start error:', err);
        })
        .finally(function () {
            propBusy = false;
            propInput.disabled = false;
            if (!propComplete) {
                propSend.disabled = propInput.value.trim() === '';
                setTimeout(function () { propInput.focus(); }, 50);
            }
        });
    }

    /* ══════════════════════ Proposal send ══════════════════════ */
    function sendProposal() {
        var text = propInput.value.trim();
        if (!text || propBusy || propComplete) return;

        addMsg(propMsgs, 'user', text);
        propHistory.push({ role: 'user', content: text });

        propInput.value = '';
        propInput.style.height = 'auto';
        propSend.disabled = true;
        propBusy = true;

        var typingEl = addTyping(propMsgs);

        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: propHistory })
        })
        .then(function (res) {
            if (!res.ok) return res.json().then(function (d) { throw new Error(d.error || 'Request failed'); });
            return res.json();
        })
        .then(function (data) {
            typingEl.remove();
            handlePropResponse(data);
        })
        .catch(function (err) {
            typingEl.remove();
            addMsg(propMsgs, 'error', 'Something went wrong. Please try again.');
            console.error('Proposal error:', err);
        })
        .finally(function () {
            propBusy = false;
            if (!propComplete) {
                propSend.disabled = propInput.value.trim() === '';
                propInput.focus();
            }
        });
    }

    /* ═══════════════ Handle proposal API response ═══════════════ */
    function handlePropResponse(data) {
        var reply = data.reply || "I didn't catch that. Please try again.";
        addMsg(propMsgs, 'assistant', reply);
        propHistory.push({ role: 'assistant', content: reply });

        if (data.intake_complete) {
            propComplete = true;
            propFill.style.width = '100%';
            propStepText.textContent = 'Complete';
            propInputWrap.classList.add('sd-done');

            if (data.intake_data) {
                fetch('/api/generate-proposal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ intakeData: data.intake_data, conversation: propHistory })
                }).catch(function (err) {
                    console.error('generate-proposal error:', err);
                });
            }
        } else if (data.intake_step) {
            updateProgress(data.intake_step);
        }
    }

}());
