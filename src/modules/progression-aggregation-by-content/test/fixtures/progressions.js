module.exports = [
  {
    content: {
      _id: '5abd06d4987d78001c38d8a8',
      userId: '5931587111aa953900e32c10',
      content: {ref: 'mod_4JGW7S08E', type: 'level', version: '1'},
      __v: 3,
      meta: {updatedAt: '2018-03-29T15:31:53.849Z', createdAt: '2018-03-29T15:31:32.534Z'},
      engineOptions: {livesDisabled: false},
      actions: [
        {
          _id: '5abd06d4987d78001c38d8a9',
          type: 'move',
          createdAt: '2018-03-29T15:31:32.534Z',
          payload: {nextContent: {type: 'slide', ref: 'sli_E17GYmTvN'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:40.903Z',
          payload: {
            content: {ref: 'sli_E17GYmTvN', type: 'slide'},
            nextContent: {ref: 'sli_NJWz27pP4', type: 'slide'},
            isCorrect: true,
            godMode: false,
            instructions: null,
            answer: ['chaîne de valeur']
          }
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:46.950Z',
          payload: {
            content: {ref: 'sli_NJWz27pP4', type: 'slide'},
            nextContent: {ref: 'sli_NySkoX6PV', type: 'slide'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: [
              'Leurs réseaux ouverts ',
              'Le potentiel de création de valeur ',
              'Les taxes réduites pour les partenaires'
            ]
          }
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:53.849Z',
          payload: {
            content: {ref: 'sli_NySkoX6PV', type: 'slide'},
            nextContent: {ref: 'sli_4JZTVG6P4', type: 'slide'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: [
              'Ce sont des systèmes reliant une multitude d’individus, d’objets et d’informations les uns aux autres'
            ]
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: false,
        slides: ['sli_E17GYmTvN', 'sli_NJWz27pP4', 'sli_NySkoX6PV'],
        lives: 1,
        step: {current: 4},
        stars: 4,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {ref: 'sli_NySkoX6PV', type: 'slide'},
        nextContent: {ref: 'sli_4JZTVG6P4', type: 'slide'},
        allAnswers: [
          {slideRef: 'sli_E17GYmTvN', isCorrect: true, answer: ['chaîne de valeur']},
          {
            slideRef: 'sli_NJWz27pP4',
            isCorrect: false,
            answer: [
              'Leurs réseaux ouverts ',
              'Le potentiel de création de valeur ',
              'Les taxes réduites pour les partenaires'
            ]
          },
          {
            slideRef: 'sli_NySkoX6PV',
            isCorrect: false,
            answer: [
              'Ce sont des systèmes reliant une multitude d’individus, d’objets et d’informations les uns aux autres'
            ]
          }
        ],
        variables: {}
      }
    }
  },

  {
    content: {
      _id: '5abd069d987d78001c38d89c',
      userId: '5931587111aa953900e32c10',
      content: {ref: 'mod_4JGW7S08E', type: 'level', version: '1'},
      __v: 5,
      meta: {updatedAt: '2018-03-29T15:31:29.636Z', createdAt: '2018-03-29T15:30:37.618Z'},
      engineOptions: {livesDisabled: false},
      actions: [
        {
          _id: '5abd069d987d78001c38d89d',
          type: 'move',
          createdAt: '2018-03-29T15:30:37.618Z',
          payload: {nextContent: {type: 'slide', ref: 'sli_VkqYwQawE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:30:53.132Z',
          payload: {
            content: {ref: 'sli_VkqYwQawE', type: 'slide'},
            nextContent: {ref: 'sli_E17GYmTvN', type: 'slide'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: ['La valeur est capturée et créée sans interruption']
          }
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:02.322Z',
          payload: {
            content: {ref: 'sli_E17GYmTvN', type: 'slide'},
            nextContent: {ref: 'sli_4kQ5af6P4', type: 'slide'},
            isCorrect: true,
            godMode: false,
            instructions: null,
            answer: ['chaîne de valeur']
          }
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:11.470Z',
          payload: {
            content: {ref: 'sli_4kQ5af6P4', type: 'slide'},
            nextContent: {ref: 'sli_NJWz27pP4', type: 'slide'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: ['de réseau']
          }
        },
        {
          type: 'answer',
          createdAt: '2018-03-29T15:31:26.378Z',
          payload: {
            content: {ref: 'sli_NJWz27pP4', type: 'slide'},
            nextContent: {ref: 'extraLife', type: 'node'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: [
              'Leurs réseaux ouverts ',
              'Le potentiel de création de valeur ',
              'Les taxes réduites pour les partenaires'
            ]
          }
        },
        {
          type: 'extraLifeRefused',
          createdAt: '2018-03-29T15:31:29.636Z',
          payload: {
            content: {ref: 'extraLife', type: 'node'},
            nextContent: {ref: 'failExitNode', type: 'failure'},
            instructions: null
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: false,
        slides: ['sli_VkqYwQawE', 'sli_E17GYmTvN', 'sli_4kQ5af6P4', 'sli_NJWz27pP4'],
        lives: 0,
        step: {current: 5},
        stars: 4,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {ref: 'extraLife', type: 'node'},
        nextContent: {ref: 'failExitNode', type: 'failure'},
        allAnswers: [
          {
            slideRef: 'sli_VkqYwQawE',
            isCorrect: false,
            answer: ['La valeur est capturée et créée sans interruption']
          },
          {slideRef: 'sli_E17GYmTvN', isCorrect: true, answer: ['chaîne de valeur']},
          {slideRef: 'sli_4kQ5af6P4', isCorrect: false, answer: ['de réseau']},
          {
            slideRef: 'sli_NJWz27pP4',
            isCorrect: false,
            answer: [
              'Leurs réseaux ouverts ',
              'Le potentiel de création de valeur ',
              'Les taxes réduites pour les partenaires'
            ]
          }
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf3',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2016-08-03T20:52:52.858Z',
        updatedAt: '2016-08-03T20:52:52.858Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2016-08-03T20:52:52.858Z',
          _id: '5d70cf443d285142c4eb10ac',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:52:52.858Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf4',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2016-08-03T20:54:53.537Z',
        updatedAt: '2016-08-03T20:54:53.537Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2016-08-03T20:54:53.537Z',
          _id: '5d70cf443d285142c4eb10ad',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:54:53.537Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf5',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2016-08-03T20:56:29.329Z',
        updatedAt: '2016-08-03T20:56:29.329Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2016-08-03T20:56:29.329Z',
          _id: '5d70cf443d285142c4eb10ae',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:56:29.329Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf6',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2016-08-03T20:57:34.001Z',
        updatedAt: '2016-08-03T20:57:34.001Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2016-08-03T20:57:34.001Z',
          _id: '5d70cf443d285142c4eb10af',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:57:34.001Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf7',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2016-08-03T20:58:32.683Z',
        updatedAt: '2016-08-03T20:58:32.683Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2016-08-03T20:58:32.683Z',
          _id: '5d70cf443d285142c4eb10b0',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2016-08-03T20:58:32.683Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf8',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2017-01-12T20:13:13.802Z',
        updatedAt: '2017-01-12T20:13:13.802Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2017-01-12T20:13:13.802Z',
          _id: '5d70cf443d285142c4eb10b1',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-01-12T20:13:13.802Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '57a2591927dc292f0065fdf9',
      userId: '57077b08850e70690097ee99',
      content: {type: 'level', ref: 'mod_VkeU7RTH~', version: '1'},
      meta: {
        createdAt: '2017-03-27T16:23:40.115Z',
        updatedAt: '2017-03-27T16:23:40.115Z',
        achievementId: '57a2591927dc292f0065fdf3'
      },
      engineOptions: {livesDisabled: false},
      actions: [
        {
          type: 'move',
          createdAt: '2017-03-27T16:23:40.115Z',
          _id: '5d70cf443d285142c4eb10b2',
          payload: {nextContent: {type: 'slide', ref: 'FAKE_SLIDE'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'slide', ref: 'FAKE_SLIDE'},
            godMode: false,
            isCorrect: true,
            instructions: null,
            answer: ['FAKE_ANSWER']
          }
        },
        {
          type: 'answer',
          createdAt: '2017-03-27T16:23:40.115Z',
          payload: {
            content: {type: 'slide', ref: 'FAKE_SLIDE'},
            nextContent: {type: 'success', ref: 'successExitNode'},
            godMode: false,
            isCorrect: true,
            instructions: [{value: 32, type: 'set', field: 'stars'}],
            answer: ['FAKE_ANSWER']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE',
          'FAKE_SLIDE'
        ],
        lives: 3,
        step: {current: 9},
        stars: 32,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {type: 'slide', ref: 'FAKE_SLIDE'},
        nextContent: {type: 'success', ref: 'successExitNode'},
        allAnswers: [
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']},
          {slideRef: 'FAKE_SLIDE', isCorrect: true, answer: ['FAKE_ANSWER']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '5af99fdb99ac5a001ca5a769',
      userId: '57077b08850e70690097ee99',
      content: {ref: 'mod_VkeU7RTH~', type: 'level', version: '1'},
      __v: 4,
      meta: {updatedAt: '2018-10-08T15:21:21.644Z', createdAt: '2018-05-14T14:40:27.337Z'},
      engineOptions: {livesDisabled: false},
      actions: [
        {
          _id: '5af99fdb99ac5a001ca5a76a',
          type: 'move',
          createdAt: '2018-05-14T14:40:27.337Z',
          payload: {nextContent: {type: 'slide', ref: 'sli_VyQuZJRSb'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2018-05-14T14:40:46.872Z',
          payload: {
            content: {ref: 'sli_VyQuZJRSb', type: 'slide'},
            nextContent: {ref: 'sli_Vkkf40TBZ', type: 'slide'},
            isCorrect: false,
            godMode: false,
            instructions: null,
            answer: ['Fnac']
          }
        },
        {
          type: 'answer',
          createdAt: '2018-05-14T14:41:10.534Z',
          payload: {
            content: {ref: 'sli_Vkkf40TBZ', type: 'slide'},
            nextContent: {ref: 'sli_N16K5R6Sb', type: 'slide'},
            isCorrect: true,
            godMode: false,
            instructions: null,
            answer: ['To multiply the number of experiences that you can have with wine. ']
          }
        },
        {
          type: 'resource',
          createdAt: '2018-10-08T15:14:15.200Z',
          payload: {
            resource: {ref: 'les_4JgSpwN-Z', type: 'video', version: '1'},
            content: {type: 'chapter', ref: 'cha_NyXLQATSZ'}
          }
        },
        {
          type: 'answer',
          createdAt: '2018-10-08T15:21:21.644Z',
          payload: {
            content: {ref: 'sli_N16K5R6Sb', type: 'slide'},
            nextContent: {ref: 'sli_E11eCC6Sb', type: 'slide'},
            isCorrect: true,
            godMode: false,
            instructions: null,
            answer: ['The heart of wine']
          }
        }
      ],
      engine: {ref: 'learner', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: ['sli_VyQuZJRSb', 'sli_Vkkf40TBZ', 'sli_N16K5R6Sb'],
        lives: 2,
        step: {current: 4},
        stars: 12,
        requestedClues: [],
        viewedResources: [{ref: 'cha_NyXLQATSZ', type: 'chapter', resources: ['les_4JgSpwN-Z']}],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {ref: 'sli_N16K5R6Sb', type: 'slide'},
        nextContent: {ref: 'sli_E11eCC6Sb', type: 'slide'},
        allAnswers: [
          {slideRef: 'sli_VyQuZJRSb', isCorrect: false, answer: ['Fnac']},
          {
            slideRef: 'sli_Vkkf40TBZ',
            isCorrect: true,
            answer: ['To multiply the number of experiences that you can have with wine. ']
          },
          {slideRef: 'sli_N16K5R6Sb', isCorrect: true, answer: ['The heart of wine']}
        ],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '5c18d95750ffcb0019108cec',
      userId: '0000000000000000000002be',
      content: {ref: 'cha_Ny1BTxRp~', type: 'chapter', version: '1'},
      __v: 1,
      meta: {updatedAt: '2018-12-18T11:26:15.780Z', createdAt: '2018-12-18T11:26:15.780Z'},
      actions: [
        {
          _id: '5c18d95750ffcb0019108ced',
          type: 'move',
          createdAt: '2018-12-18T11:26:15.780Z',
          payload: {nextContent: {type: 'slide', ref: 'sli_VkcAWR-ZQ'}, instructions: null}
        }
      ],
      engine: {ref: 'microlearning', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: [],
        lives: 1,
        step: {current: 1},
        stars: 0,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        nextContent: {type: 'slide', ref: 'sli_VkcAWR-ZQ'},
        allAnswers: [],
        variables: {}
      }
    }
  },
  {
    content: {
      _id: '5c18d95750ffcb0019108cec2',
      userId: '0000000000000000000002be',
      content: {ref: 'cha_Ny1BTxRp~', type: 'chapter', version: '1'},
      __v: 1,
      meta: {updatedAt: '2018-12-18T11:26:46.137Z', createdAt: '2018-12-18T11:26:15.780Z'},
      actions: [
        {
          _id: '5c18d95750ffcb0019108ced2a',
          type: 'move',
          createdAt: '2018-12-18T11:26:15.780Z',
          payload: {nextContent: {type: 'slide', ref: 'sli_VkcAWR-ZQ'}, instructions: null}
        },
        {
          type: 'answer',
          createdAt: '2018-12-18T11:26:46.137Z',
          payload: {
            content: {ref: 'sli_VkcAWR-ZQ', type: 'slide'},
            nextContent: {ref: 'sli_VktuuzFW7', type: 'slide'},
            isCorrect: true,
            godMode: false,
            instructions: null,
            answer: ['Bonne réponse']
          }
        }
      ],
      engine: {ref: 'microlearning', version: '1'},
      state: {
        livesDisabled: false,
        isCorrect: true,
        slides: ['sli_VkcAWR-ZQ'],
        lives: 1,
        step: {current: 2},
        stars: 4,
        requestedClues: [],
        viewedResources: [],
        remainingLifeRequests: 1,
        hasViewedAResourceAtThisStep: false,
        content: {ref: 'sli_VkcAWR-ZQ', type: 'slide'},
        nextContent: {ref: 'sli_VktuuzFW7', type: 'slide'},
        allAnswers: [{slideRef: 'sli_VkcAWR-ZQ', isCorrect: true, answer: ['Bonne réponse']}],
        variables: {}
      }
    }
  }
];
