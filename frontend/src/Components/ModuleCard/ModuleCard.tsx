import React from 'react';
import { ModulesInterface } from '../../interfaces/modules/ModulesInterface';
interface ModuleCardProps {
  module: ModulesInterface
}

function ModuleCard({ module }: ModuleCardProps) {
  return (
    <section>
      <h1>{module.name}</h1>
    </section>
  );
}

export default ModuleCard;
