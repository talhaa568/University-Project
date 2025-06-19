import React, { useState, useEffect } from 'react';
import { Button, Spinner, Switch } from '@material-tailwind/react';

const GATES = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

const Logicgates = () => {
  const [gate, setGate] = useState('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);
  const [output, setOutput] = useState(null);
  const [manualMode, setManualMode] = useState(false);
  const [manualLED, setManualLED] = useState(null);
  const [sending, setSending] = useState(false);
  const [espIP, setEspIP] = useState(localStorage.getItem('esp_ip') || '');

  const evaluateGate = (A, B, gateType) => {
    switch (gateType) {
      case 'AND': return A && B;
      case 'OR': return A || B;
      case 'NOT': return !A;
      case 'NAND': return !(A && B);
      case 'NOR': return !(A || B);
      case 'XOR': return A !== B;
      case 'XNOR': return A === B;
      default: return 0;
    }
  };

  const sendToESP = async (value) => {
    if (!espIP) {
      alert('Please enter the ESP32 IP address first!');
      return;
    }
    const url = `http://${espIP}/output?value=${value}`;
    try {
      await fetch(url);
    } catch (err) {
      console.error('ESP32 connection failed:', err);
    }
  };

  const handleSend = async () => {
    if (sending) return;
    setSending(true);

    if (manualMode) {
      if (manualLED === null) await sendToESP(2);
      else if (manualLED === true) await sendToESP(1);
      else await sendToESP(0);
    } else {
      const A = inputA ? 1 : 0;
      const B = inputB ? 1 : 0;
      const result = evaluateGate(A, B, gate);
      setOutput(result);
      await sendToESP(result ? 1 : 0);
    }

    setTimeout(() => setSending(false), 800);
  };

  const saveIP = () => {
    localStorage.setItem('esp_ip', espIP);
    alert('ESP32 IP address saved!');
  };

  return (
    <div className="container">
      <h1 className="title">Logic Gates Simulator</h1>

      {/* ESP32 IP Input Field */}
      <div className="card">
        <label className="label">ESP32 IP Address</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. 192.168.0.107"
            className="dropdown px-4 py-2 bg-gray-800 text-white rounded"
            value={espIP}
            onChange={(e) => setEspIP(e.target.value)}
          />
          <Button color="green" onClick={saveIP}>Save IP</Button>
        </div>
      </div>

      <div className="card">
        <label className="label">Manual Mode</label>
        <div className="flex items-center gap-4">
          <Switch
            checked={manualMode}
            className='bg-gray-400'
            onChange={() => {
              setManualMode(!manualMode);
              setOutput(null);
            }}
            color="blue"
          />
          <span>{manualMode ? 'Manual ON' : 'Manual OFF'}</span>
        </div>
      </div>

      {!manualMode && (
        <>
          <div className="card">
            <label className="label">Select Gate</label>
            <select
              className="dropdown"
              value={gate}
              onChange={(e) => setGate(e.target.value)}
            >
              {GATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="card">
            <label className="label">Inputs</label>
            <div className="buttonRow">
              <Button
                className={`inputButton ${inputA ? 'active' : ''}`}
                onClick={() => setInputA(!inputA)}
              >
                A: {inputA ? '1' : '0'}
              </Button>

              {gate !== 'NOT' && (
                <Button
                  className={`inputButton ${inputB ? 'active' : ''}`}
                  onClick={() => setInputB(!inputB)}
                >
                  B: {inputB ? '1' : '0'}
                </Button>
              )}
            </div>
          </div>

          <div className="card">
            <p className="text-lg">
              Output: <strong>{output !== null ? (output ? '1 (True)' : '0 (False)') : '—'}</strong>
            </p>
          </div>
        </>
      )}

      {manualMode && (
        <div className="card">
          <label className="label">Manual LED Control</label>
          <div className="flex gap-4 flex-wrap">
            <Button
              color={manualLED === true ? 'green' : 'gray'}
              onClick={() => {
                setManualLED(true);
                sendToESP(1);
              }}
            >
              Turn Green (D23)
            </Button>
            <Button
              color={manualLED === false ? 'red' : 'gray'}
              onClick={() => {
                setManualLED(false);
                sendToESP(0);
              }}
            >
              Turn Red (D22)
            </Button>
            <Button
              color="gray"
              onClick={() => {
                setManualLED(null);
                sendToESP(2);
              }}
            >
              Turn Off
            </Button>
          </div>
        </div>
      )}

      <Button
        className="sendButton mt-6"
        color="blue"
        onClick={handleSend}
      >
        Send
      </Button>
    </div>
  );
};

export default Logicgates;
