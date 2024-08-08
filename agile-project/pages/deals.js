import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddDealModal from '../app/components/AddDealModal';
import { fetchDeals, updateDealStage } from '@/app/slice/dealsSlice';
import DealCard from '../app/components/DealCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DealsPage = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.deals);
  const [localDeals, setLocalDeals] = useState([]);
  const [isAddDealModalOpen, setAddDealModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  useEffect(() => {
    setLocalDeals(deals);
  }, [deals]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
        const updatedDeals = localDeals.map((deal) =>
          deal._id === result.draggableId ? { ...deal, stage: destination.droppableId } : deal
        );
        setLocalDeals(updatedDeals);

        dispatch(
          updateDealStage({
            id: result.draggableId,
            stage: destination.droppableId,
          })
        );
      }
    },
    [dispatch, localDeals]
  );

  const stages = useMemo(() => ['Initiated', 'Qualified', 'Contract Sent', 'Closed Won', 'Closed Lost'], []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Deals</h1>
      <button onClick={() => setAddDealModalOpen(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Add Deal
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {stages.map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded shadow">
                  <h2 className="font-bold mb-2 capitalize">{stage}</h2>
                  {deals
                    .filter((deal) => deal.stage === stage)
                    .map((deal, index) => (
                      <Draggable key={deal._id} draggableId={deal._id} index={index}>
                        {(provided) => (
                          <DealCard
                            deal={deal}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <AddDealModal isOpen={isAddDealModalOpen} onClose={() => setAddDealModalOpen(false)} />
    </div>
  );
};

export default DealsPage;
