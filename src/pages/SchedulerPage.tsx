import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Play, Pause, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface OptimizationStep {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  details?: string;
}

function SchedulerPage() {
  const { generateTimetable, faculty, rooms, subjects, batches } = useData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<OptimizationStep[]>([
    { name: 'Initializing AI Engine', status: 'pending', progress: 0 },
    { name: 'Loading Constraints', status: 'pending', progress: 0 },
    { name: 'Generating Initial Population', status: 'pending', progress: 0 },
    { name: 'Running Genetic Algorithm', status: 'pending', progress: 0 },
    { name: 'Applying OR-Tools Optimization', status: 'pending', progress: 0 },
    { name: 'Validating Solution', status: 'pending', progress: 0 },
    { name: 'Finalizing Timetable', status: 'pending', progress: 0 }
  ]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep(0);

    // Reset all steps
    setSteps(prev => prev.map(step => ({
      ...step,
      status: 'pending',
      progress: 0
    })));

    // Simulate optimization process
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update current step to running
      setSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'running', progress: 0 }
          : step
      ));

      // Simulate progress for current step
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, progress }
            : step
        ));
      }

      // Mark current step as completed
      setSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'completed', progress: 100 }
          : step
      ));
    }

    // Generate the actual timetable
    await generateTimetable();
    setIsGenerating(false);
  };

  const getStepIcon = (step: OptimizationStep, index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (step.status === 'failed') {
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    } else if (step.status === 'running') {
      return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
    }
    return (
      <div className={`w-5 h-5 rounded-full border-2 ${
        index <= currentStep ? 'border-blue-600' : 'border-gray-300'
      }`} />
    );
  };

  return (
    <div className="space-y-8 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">AI Timetable Scheduler</h1>
        <div className="flex items-center space-x-4">
          {isGenerating && (
            <span className="text-sm text-gray-600">
              Optimization in progress...
            </span>
          )}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Generating...
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Generate Timetable
              </>
            )}
          </button>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{faculty.length}</div>
          <div className="text-sm text-gray-600">Faculty Members</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-green-600">{rooms.length}</div>
          <div className="text-sm text-gray-600">Available Rooms</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{subjects.length}</div>
          <div className="text-sm text-gray-600">Subjects</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">{batches.length}</div>
          <div className="text-sm text-gray-600">Student Batches</div>
        </div>
      </div>

      {/* Optimization Process */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Optimization Process</h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              {getStepIcon(step, index)}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    step.status === 'completed' ? 'text-green-700' :
                    step.status === 'running' ? 'text-blue-700' :
                    step.status === 'failed' ? 'text-red-700' :
                    'text-gray-700'
                  }`}>
                    {step.name}
                  </span>
                  {step.status !== 'pending' && (
                    <span className="text-xs text-gray-500">
                      {step.progress}%
                    </span>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'running' ? 'bg-blue-500' :
                      step.status === 'failed' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
                
                {step.details && (
                  <p className="text-xs text-gray-500 mt-1">{step.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Techniques</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Genetic Algorithm (DEAP)</h4>
                <p className="text-sm text-gray-600">
                  Evolutionary optimization for global solution space exploration
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">OR-Tools CP-SAT</h4>
                <p className="text-sm text-gray-600">
                  Constraint programming for hard constraint satisfaction
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Local Search</h4>
                <p className="text-sm text-gray-600">
                  Tabu search and greedy improvements for solution refinement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Faculty Workload Balance</span>
              <span className="text-sm font-medium text-gray-900">High Priority</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Room Utilization</span>
              <span className="text-sm font-medium text-gray-900">Medium Priority</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Student Schedule Gaps</span>
              <span className="text-sm font-medium text-gray-900">High Priority</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Time Preferences</span>
              <span className="text-sm font-medium text-gray-900">Low Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulerPage;